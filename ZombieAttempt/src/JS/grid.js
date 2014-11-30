function Location(x, y) {
  this.x = x;
  this.y = y;
  this.add = function(loc) {
    return new Location(this.x + loc.x, this.y + loc.y);
  };
}
/**
 * @class Grid
 *        				Grid Is just a wrapper around a LengthxWidth integer array with some helper functions
 * @param  {integer} length Numbey of cells on the Y-axis
 * @param  {integer} width  Number of cells on the X-axis
 * @return {Grid}        Complete Grid
 */
function grid(length, width) {
  grid = new Array(width);
  for(var i = 0; i < width; i++) {
    grid[i] = new Array(length);
    for (var j = 0; j < length; j++) {
      grid[i][j] = 0;
    }
  }

  this.length = length;
  this.width = width;

  this.get = function(loc, y) {
    if (typeof loc === "number") {
      return grid[loc][y];
    }else {
      return grid[loc.x][loc.y];
    }
  };

  this.canMove = function(loc) {
    return inBounds(loc) && map[loc.x][loc.y] === 0;
  };

  this.printToConsole = function() {
    var result = "";
    for (var i = 0; i < grid.length; i++) { //Fill Map
      for (var j = 0; j < grid[i].length; j++) {
        result += grid[i][j] + " ";
      }
      result += "\n";
    }
    result += "\n";
    console.log(result);
  };

  this.add = function(loc, value) {
    if (typeof value === "number") {
      map[loc.x][loc.y] = value;
      return true;
    } else {
      return false;
    }
  };

  /**
   * getNeighbors() returns the states of the neighbors of the loc passed in place of the direction string given
   * @param {Location} loc  The location to check around
   * @param {string} dirs A string made up of valid direction
   * @param {array} dirs dirStrings in an array rather than string
   * @returns {array} state info of neighbors
   */
  this.getNeighbors = function (loc, dirs) {
    dirs = getDirs(dirs);
    var neighbors = new Array(dirs.length); //Six neighbors
    for (var i = 0; i < dirs.length; i++) {
      neighbors[i] = this.get(loc.add(dirs[i]));
    }
    return neighbors;
  };

  this.getNeighborLocs = function(loc, dirs) { //SPECIAL CASE FOR STUFF
    dirs = getDirs(dirs);
    var neighbors = new Array(dirs.length); //Six neighbors
    for (var i = 0; i < dirs.length; i++) {
      neighbors[i] = this.get(loc.add(dirs[i]));
    }
    return neighbors;
  };

  this.inBounds = function(loc) {
    if (loc !== null) {
      return loc.x >= 0 && loc.x < width && loc.y >= 0 && loc.y < length;
    } else {
      return false;
    }
  };

    this.move = function(loc, dest) {
      var temp = grid[dest.x][dest.y];
      grid[dest.x][dest.y] = grid[loc.x][loc.y];
      grid[loc.x][loc.y] = temp;
    };
    /**
     * Direction consists of one array
     * 		'dirVectors':  consists of the common english words for the directions aswell as there offsets
     * 		in Location objects
     */
      dirVectors = {
        Up: new Location(0, 1),
        UpRight:  new Location(1, 1),
        Right:  new Location(1, 0),
        DownRight:  new Location(1, -1),
        Down: new Location(0, -1),
        DownLeft:  new Location(-1, -1),
        Left:  new Location(-1, 0),
        UpLeft:  new Location(-1, 1)
      };

    /**
     * getDirs takes in directions and outputs tbere Location offsets
     * @param {array or string} dirs The directions to evaluate can either be in a string e.g. "Up Left DownRight Up"
     *                      							or an array e.g. ["Up", "Left", "DownRight", "Up"]
     * @returns {array} Location offsets length = # of dirs
     */
    this.getDirs = function(dirs) {
      if (typeof dirs === "string") {
        dirs = dirs.split(" ");
      }
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = dirVectors[dirs[i]];
      }
      return dirs;
  };
}
