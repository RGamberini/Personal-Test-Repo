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

function prettyLocPrint(loc) { console.log("X: " + loc.x + " Y: " + loc.y); }

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

map = [[0,0,0],[0,0,0],[0,1,2]];

var z = 100,
  v = 100,
  h = 100,
  t = 25, MAXACTIONS = 2; //Constants

function prettyPrint(map) {
  for (var i = 0; i < size; i++) { //Fill Map
    for (var j = 0; j < size; j++) {
      process.stdout.write(map[i][j] + " ");
    }
    process.stdout.write("\n");
  }
  process.stdout.write("\n");
}

initGraphics();
//updateGraphics(map);
$("#glorp").click(buttonPress);

function updateGraphics() {
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      $("#tile" + i + "" + j).attr("class","tile + " + types[map[i][j]].name);
    }
  }
}

function buttonPress() {
  console.log(map[0] + "\n" + map[1] + "\n" + map[2]);
  gameloop();
  updateGraphics();
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
}

function initGraphics() {
  var SIZE = 50;
  for (var i = 0; i < map.length; i++) {
    $("#word").append($("<tr id = 'row" + i + "''></tr>"));
    for(var j = 0; j < map[i].length; j++) {
      $("#row" + i).append($("<td id='tile" + i  + "" + j +
      "' class = 'tile + " + types[map[i][j]].name + "''></td>"));
    }
  }
  var width = 14 + map[0].length * (SIZE + 4),
      height = 14 + map.length * (SIZE + 4);
      //Perfect width for 2: 122px
      //perfect width for 3: 176px
      //Each adds 54
  $(".middleContainer").width(width);
  $(".middleContainer").height(height);
  $(".topContainer").width(width + 25);
  $(".topContainer").height(height + 25 - (25 / 2));
  $("#debug").text("Width: " + width + " Height: " + (height + 25) + " Actual Height: " +
  $(".topContainer").height());
};
