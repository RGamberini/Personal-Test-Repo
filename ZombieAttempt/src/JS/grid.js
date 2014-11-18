types = new Array(3);
function Location(x, y) {
  this.x = x;
  this.y = y;
  this.add = function(loc) {
    return new Location(this.x + loc.x, this.y + loc.y);
  };
}

function grid(stringGrid) {
  var grid = stringGrid.split("\n");
  for (var i = 0; i < grid.length; i++) {
    grid[i] = grid[i].split(" ");
  }
  this.get = function(loc) {
    return grid[loc.x][loc.y];
  }

  this.canMove = function(loc) {
    return inBounds(loc) && map[loc.x][loc.y] === 0;
  }
  this.printToConsole = function() {
    var result = "";
    for (var i = 0; i < grid.length; i++) { //Fill Map
      for (var j = 0; j < grid[i].length; j++) {
        result += grid[i][j] + " ";
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

map = new grid("0 1 0\n2 0 2\n0 1 0");
map.printToConsole();
