initGraphics();
//gameloop();
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
