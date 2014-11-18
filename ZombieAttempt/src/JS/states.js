var types = [ //Where I keep the state info

  {
    name: "Empty",
    id: 0,
    actions: []
  },

  {
    name: "Zombie",
    id: 1,
    actions: [function move(loc) {
        console.log("Zombie Move");
        return moveRandomly(loc, cardinaldirs); //Zombies are simple creatures
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

function moveRandomly(loc, dirs) {
  shuffle(dirs); //List of random directions
  for (var i = 0; i < dirs.length; i++) {
    var newLoc = loc.add(dirVectors[dirs[i]]);
    if (canMove(newLoc)) {
      console.log(types[map[loc.x][loc.y]].name + " just moved from (" + loc.x + ", " + loc.y + ") to (" + newLoc.x + ", " + newLoc.y + ")");
      return moveLoc(loc, newLoc); // Do the move
    }
  }
  return false;
}
