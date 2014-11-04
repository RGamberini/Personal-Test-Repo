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
  return map[loc.x][loc.y] === 0;
}

function moveDir(loc, dir) { //moveDir checks the location before moving while moveLoc is a straight switch
  var newLoc = loc.add(dir);
  if (!canMove(newLoc)) {
    return false;
  }
  var temp = map[loc1.x][loc1.y];
  map[loc1.x][loc1.y] = 0;
  map[newLoc.x][newLoc.y] = temp;
  return true;
}

function moveLoc(loc, newLoc) {
  var temp = map[loc1.x][loc1.y];
  map[loc1.x][loc1.y] = 0;
  map[newLoc.x][newLoc.y] = temp;
  return true;
}

var types = [ //Where I keep the state info

    {
      name: "Empty",
      id: 0
    },

    {
      name: "Zombie",
      id: 1,
      move: function(loc) {
        shuffle(cardinaldirs); //List of random directions
        for (i = 0; i < cardinaldirs.length; i++) {
          if (canMove()) {
            return move(loc, cardinaldirs[i]); // Do the move
          }
        }
        return false;
      }
    },

    {
      name: "Victim",
      id: 2,
      move: function(loc) {
        for (i = 0; i < dirs.size; i++) {
          if (entityAt(loc.add(cardinaldirs[i])) == 1) {
            move(loc, cardinaldirs[getRandomInt(0, 3)]);
          }
        }
      }
    },

    {
      name: "Hunter",
      id: 3,
      move: function(loc) {
        shuffle(dirs); //List of random directions
        for (i = 0; i < dirs.length; i++) {
          if (canMove(newLoc)) {
            return move(loc, dirs[i]); // Do the move
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

for (i = 0; i < size; i++) { //Fill Map
  map[i] = new Array(size);
  for (j = 0; j < size; j++) {
    map[i][j] = getRandomInt(0, 4);
  }
}

var z = 100,
  v = 100,
  h = 100,
  t = 25; //Constants

// for (i = 0; i < 10; i++) {
//   gameloop();
// }
gameloop();

function prettyPrint(map) {
  for (i = 0; i < size; i++) { //Fill Map
    for (j = 0; j < size; j++) {
      process.stdout.write(map[i][j] + " ");
    }
    process.stdout.write("\n");
  }
}

function gameloop() {
  prettyPrint(map);
  for (i = 0; i < size; i++) { //Fill Map
    for (j = 0; j < size; j++) {
      types[map[i][j]].move();
    }
  }
}
