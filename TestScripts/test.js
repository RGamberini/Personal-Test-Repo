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

function fill2DArray(size) {
  var y = new Array(20);
  for(i = 0; i < size; i++) {
    y[i] = new Array(20);
    for (j = 0; j < size; j++) {
    }
  }
}

console.log(shuffle([1,2,3,4,5,]))
