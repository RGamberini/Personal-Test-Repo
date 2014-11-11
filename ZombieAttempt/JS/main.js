
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
  return map[loc.x][loc.y];
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

function inBounds(loc) {
  return loc.x >= 0 && loc.x < size && loc.y >= 0 && loc.y < size
}

function prettyLocPrint(loc) { console.log("X: " + loc.x + " Y: " + loc.y); }

var types = [ //Where I keep the state info

    {
      name: "Empty",
      id: 0
    },

    {
      name: "Zombie",
      id: 1,
      move: function(loc) {
        for (var i = 0; i < dirs.length; i++) {
          var newLoc = loc.add(dirVectors[dirs[i]]);
          if (canMove(newLoc)) {
            shuffle(dirs); //List of random directions
            return moveLoc(loc, newLoc); // Do the move
          }
        }
        return false;
      }
    },

    {
      name: "Victim",
      id: 2,
      move: function(loc) {
        for (var i = 0; i < dirs.size; i++) {
          if (entityAt(loc.add(cardinaldirs[i])) == 1) {
            return moveDir(loc, cardinaldirs[getRandomInt(0, 3)]);
          }
        }
        return false;
      }
    },

    {
      name: "Hunter",
      id: 3,
      move: function(loc) {
        for (var i = 0; i < dirs.length; i++) {
          var newLoc = loc.add(dirVectors[dirs[i]]);
          if (canMove(newLoc)) {
            shuffle(dirs); //List of random directions
            return moveLoc(loc, newLoc); // Do the move
          }
        }
        return false;
      }
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

map = [[1,1,1], [2,0,2], [3,3,3]];

var z = 100,
  v = 100,
  h = 100,
  t = 25; //Constants

// for (i = 0; i < 10; i++) {
//   gameloop();
// }
gameloop();
gameloop();

function prettyPrint(map) {
  for (var i = 0; i < size; i++) { //Fill Map
    for (var j = 0; j < size; j++) {
      process.stdout.write(map[i][j] + " ");
    }
    process.stdout.write("\n");
  }
}

function gameloop() {
  prettyPrint(map);
  for (var i = 0; i < size; i++) { //Fill Map
    for (var j = 0; j < size; j++) {
      if (map[i][j] !== 0) {
        types[map[i][j]].move(new Location(i, j));
      }
    }
    console.log()
  }
}
