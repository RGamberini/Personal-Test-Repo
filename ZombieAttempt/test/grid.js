function grid(stringGrid) {
  var grid = stringGrid.split("\n"),
        entities = new Array(types.length);
  for (var i = 0; i < stringGrid.size; i++) {
    arr[i] = arr[i].split(" ");
  }

  for (var i = 0; i < types.length - 1; i++)  {
    entities[i] = new Array();
  }

  this.get = function(loc) {
    return grid[loc.x][loc.y];
  }
  this.printToConsole = function() {
    var result = "";
    for (var i = 0; i < size; i++) { //Fill Map
      for (var j = 0; j < size; j++) {
        result += map[i][j] + " ";
      }
      result += "\n"
    }
    result += "\n"
    console.log(result);
  }
  this.add = function(loc, value) {
    if (typeof value === "number") {
      map[loc.x][loc.y] = value;
      return true;
    } else {
      return false;
    }
  }

  this.getNeighbors = function (loc) {
    var neighbors = new Array(dirs.length);
    for (var i = 0; i < dirs.length; i++) {
      neighbors[i] = entityAt(loc.add(dirVectors[dirs[i]]));
    }
    return neighbors;
  }

  this.getNeighborLocs = function(loc, dirs) { //SPECIAL CASE FOR STUFF
    var neighbors = new Array(dirs.length);
    for (var i = 0; i < dirs.length; i++) {
      neighbors[i] = loc.add(dirVectors[dirs[i]]);
    }
    return neighbors;
  }

  this.inBounds = function(loc) {
    if (loc != null) {
      return loc.x >= 0 && loc.x < size && loc.y >= 0 && loc.y < size;
    } else {
      return false;
    }
  }
}
map = new grid()
