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

  return array;
}

function spaceOccupiedBy(loc) {
  return map[loc.x][loc.y];
}

function Location(x, y) {
  this.x = x;
  this.y = y;
  this.add = function(loc) {
    return new Location(this.x + loc.x, this.y + loc.y);
  };
}

function move(loc1, loc2) {
  var temp = map[loc1.x][loc1.y];
  map[loc1.x][loc1.y] = 0;
}

var types = [
{
  name: "Zombie",
  id: 1,
  move: function(loc) {
    shuffled = shuffle(cardinaldirs); //List of random directions
    c = 0;
    do { //Loop through until you find a location that's unoccupied or return -1 for failure
      entity = spaceOccupiedBy(loc.add(shuffled[c]));
      c++;
      if (c == shuffled.length - 1) {
        return -1;
      }
    } while (entity !== 0);
    move(loc, shuffled[c]); // Do the move
    return 1; // 1 for success
  }
}
],

size = 20, //Board size
map = new Array(size), //I have no better way to initialize a 2d array 

cardinaldirs = [ 0, 2, 4, 6 ], //for randomizing
dirs = [ 0, 1, 2, 3, 4, 5, 6 ],

dirVectors = [ new Location(0, 1), new Location(1, 1), new Location(1, 0), new Location(1, -1),
new Location(0, -1), new Location(-1, -1), new Location(-1, 0), new Location(-1, 1) ]; //So that nice coordinate addition function I wrote has a use

for (i = 0; i < size; i++) { //Still no better way to do this AFAIK
  map[i] = new Array(size);
}

for (i = 0; i < size; i++) {
  for (j = 0; j < size; j++) {
    map[i][j] = getRandomInt(4);
  }
}

function gameloop() {

}
