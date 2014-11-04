function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var map = [
  []
];
var types = [{
  name: "Zombie",
  move: function(loc) {

  }
}]

function Location(x, y) {
  this.x = x;
  this.y = y;
  this.add = function(loc) {
    this.x = this.x + loc.x;
    this.y = this.y + loc.y;
  }
}
var size = 20;
var cardinaldirs = [0, 2, 4, 6]
var dirs = [new Location(0,1), new Location(1,1),new Location(1,0),new Location(1,-1), new Location(0,-1),new Location(-1,-1),new Location(-1,0),new Location(-1,1)]
var zerotwenty = Array.apply(null, Array(size)).map(function(_, i) {
  return i;
});
for (i = 0; i < size; i++) {
  for (j = 0; j < size; j++) {
    map[i][j] = getRandomInt(0, 4);
  }
}

function gameloop() {
  var xlocs = zerotwenty,
    ylocs = zerotwenty;

}
