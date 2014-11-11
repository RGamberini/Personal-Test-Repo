function shuffle(array) {
  var m = array.length;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function fill2DArray(size) {
  var y = new Array(size);
  for(i = 0; i < size; i++) {
    y[i] = new Array(size);
    for (j = 0; j < size; j++) {
      y[i][j] = Math.floor(Math.random() * 3);
    }
  }
  return y;
}

console.log(shuffle([1,2,3,4,5,]));
console.log(fill2DArray(5));
