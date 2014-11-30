
var commonFunctions = {
  shuffle: function (array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  },
  moveRandomly: function (grid, loc, directions) {
    var potentialLocations = shuffle(grid.parseDirs(directions));
    for (var i = 0; i < dirs.length; i++) {
      var newLoc = loc.add(dirs[i]);
      if (grid.canMove(newLoc)) {
        console.log(types[map[loc.x][loc.y]].name + " just moved from (" + loc.x + ", " + loc.y + ") to (" + newLoc.x + ", " + newLoc.y + ")");
        return moveLoc(loc, newLoc); // Do the move
    }
  }
  return false;
}},

commonConstants = {
  cardinal: ["Up", "Down", "Left", "Right"],
  all: ["Up", "UpRight", "Right", "DownRight", "Down", "DownLeft", "Left", "UpLeft"]
};


/**
 * State
 * 			A State is a named object with a list of "actions" which are functions passed a location,
  			 and a grid, that manipulate the grid based on the states of the location and the locations
         in the grid around that location
 * @param  {string} name    The name and accesor of the state use this with grid.state
 * @param  {object} params  Parameters used in the action functions that may need to be accesed from the outside
 * @param  {array} actions A list of functions of the actions a cell will do called in the order passed
 */
var State = function(name, params, actions) {
  this.name = name;
  this.params = params;
  this.actions = actions;
};
var types = [ //Where I keep the state info

  {
    name: "Empty",
    actions: []
  },

  {
    name: "Zombie",
    params: {},
    actions: [
      function move(grid, loc) {
        params.moveRandomly(grid, loc);
      },
      function bite(loc) {
        shuffle(cardinaldirs);
        var neighbors = getNeighbors(loc, cardinaldirs); //Remember to shuffle!
        for (var i = 0; i < neighbors.length; i++) {
          if (inBounds(neighbors[i]) && (entityAt(neighbors[i]) == 2 || entityAt(neighbors[i]) == 3)) {
            console.log("bite");
          }
        }
      }
    ]
  },

  {
    name: "Victim",
    id: 2,
    actions: [function move(loc) {
      var neighbors = getNeighbors(loc, dirs);
      console.log(neighbors);
      for (var i = 0; i < neighbors.length; i++) {
        if (neighbors[i] === 1) {
          console.log("Zombie!");
          moveRandomly(loc, dirs);
        }
      }
      return false;
    }]
  },

  {
    name: "Hunter",
    id: 3,
    actions: [
      function move(loc) {
        return moveRandomly(loc, dirs);
      },
      // function lookForZombie(loc) {
      //   var frontier = getNeighborLocs(loc, dirs), visited = [loc];
      //   while (frontier.length > 0) {
      //     var current = frontier.shift();
      //     for (var next = 0; getNeighborLocs(current, dirs)) {
      //       if (!$.inArray(current, visited)) {
      //         visited.push(current);
      //       }
      //     }
      //   }
      // },
      function hunt(loc) {
        var neighbors = grid.getNeighbors(loc);
        for (var i = 0; i < neighbors.length; i++) {
          if (neighbors[i] == 1) {
            neighbors[i] = 0;
          }
          if (c == 2) {
            break;
          }
        }
      }
    ]
  }
];
