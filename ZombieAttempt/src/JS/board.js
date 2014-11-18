function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
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
}

function entityAt(loc) {
  if (inBounds(loc)) {
    return map[loc.x][loc.y];
  }else {
    return null;
  }
}

function Location(x, y) {
  this.x = x;
  this.y = y;
  this.add = function(loc) {
    return new Location(this.x + loc.x, this.y + loc.y);
  };
}

function canMove(loc) {
  return inBounds(loc) && map[loc.x][loc.y] === 0;
}

function moveDir(loc, dir) { //moveDir checks the location before moving while moveLoc is a straight switch
  var newLoc = loc.add(dir);
  if (!canMove(newLoc)) {
    return false;
  }
  var temp = map[loc.x][loc.y];
  map[loc.x][loc.y] = 0;
  map[newLoc.x][newLoc.y] = temp;
  return true;
}

function moveLoc(loc, newLoc) {
  var temp = map[loc.x][loc.y];
  map[loc.x][loc.y] = 0;
  map[newLoc.x][newLoc.y] = temp;
  return true;
}

function getNeighbors(loc, dir) {
  var neighbors = new Array(dir.length)
  for (var i = 0; i < dir.length; i++) {
    neighbors[i] = entityAt(loc.add(dir[i]));
  }
  return neighbors;
}

function inBounds(loc) {
  return loc.x >= 0 && loc.x < size && loc.y >= 0 && loc.y < size
}

function prettyLocPrint(loc) { console.log("X: " + loc.x + " Y: " + loc.y); }

var types = [ //Where I keep the state info

    {
      name: "Empty",
      id: 0,
      actions: []
    },

    {
      name: "Zombie",
      id: 1,
      actions:
      [ function move(loc) {
        shuffle(dirs); //List of random directions
        for (var i = 0; i < dirs.length; i++) {
          var newLoc = loc.add(dirVectors[dirs[i]]);
          if (canMove(newLoc)) {
            return moveLoc(loc, newLoc); // Do the move
          }
        }
        return false;
      },

      function bite(loc) {
        shuffle(cardinaldirs);
        var neighbors = getNeighbors(loc, cardinaldirs); //Remember to shuffle!
        for (var i = 0; i < neighbors.length; i++) {
          if (neighbors[i] == 2 || neighbors[i] == 3) {
            neighbors[i] = 1;
          }
        }
      }
    ]},

    {
      name: "Victim",
      id: 2,
      actions:
      [ function move(loc) {
        var neighbors = getNeighbors(loc, dirs);
        for (var i = 0; i < neighbors.length; i++) {
          if (neighbors[i] == 1) {
            return moveDir(loc, cardinaldirs[getRandomInt(0, 3)]);
          }
        }
        return false;
      } ]
    },

    {
      name: "Hunter",
      id: 3,
      actions: [
      function move(loc) {
        shuffle(dirs);
        for (var i = 0; i < dirs.length; i++) {
          var newLoc = loc.add(dirVectors[dirs[i]]);
          if (canMove(newLoc)) {
            shuffle(dirs); //List of random directions
            return moveLoc(loc, newLoc); // Do the move
          }
        }
        return false;
      },
      function hunt(loc) {
        var neighbors = getNeighbors(loc, dirs),
        c = 0;
        for (var i  = 0; i < neighbors.length; i++) {
          if (neighbors[i] == 1) {
            neighbors[i] = 0;
          }
          if (c == 2) {break;}
        }
      }]
    }
  ],

  size = 3, //Board size
  map = new Array(size), //I have no better way to initialize a 2d array

  cardinaldirs = [0, 2, 4, 6], //for randomizing
  dirs = [0, 1, 2, 3, 4, 5, 6],

  dirVectors = [new Location(0, 1), new Location(1, 1), new Location(1, 0), new Location(1, -1),
    new Location(0, -1), new Location(-1, -1), new Location(-1, 0), new Location(-1, 1)
  ]; //So that nice coordinate addition function I wrote has a use

for (var i = 0; i < size; i++) { //Fill Map
  map[i] = new Array(size);
  for (var j = 0; j < size; j++) {
    map[i][j] = getRandomInt(0, 4);
  }
}

map = [[1,0,0], [0,2,0], [0,0,1]];

var z = 100,
  v = 100,
  h = 100,
  t = 25, MAXACTIONS = 2; //Constants

// for (i = 0; i < 10; i++) {
//   gameloop();
// }
prettyPrint(map);
gameloop();
gameloop();

function prettyPrint(map) {
  for (var i = 0; i < size; i++) { //Fill Map
    for (var j = 0; j < size; j++) {
      process.stdout.write(map[i][j] + " ");
    }
    process.stdout.write("\n");
  }
  process.stdout.write("\n");
}

function gameloop() {
  for (var currentAction = 0; currentAction < MAXACTIONS; currentAction++) {
    for (var i = 0; i < size; i++) { //Fill Map
      for (var j = 0; j < size; j++) {
        if (map[i][j] !== 0) {
          type = types[map[i][j]];
          if (currentAction < type.actions.length) {
            type.actions[currentAction](new Location(i, j));
          }
        }
      }
    }
  }
  prettyPrint(map);
}
