function shuffle(array) {
    var m = array.length, t, i;
    let procedure = [];
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      procedure.push({
          operation: 'swap',
          index1: m,
          index2: i
      });
      array[m] = array[i];
      array[i] = t;
    }
  
    return [array, procedure];
  }

function getBogoProcedure(array) {
    let auxArr = array;
    let procedure = [];
    let shuffled;
    let unsorted = true;

    outer: while (unsorted) {
        for (var i = 0; i < auxArr.length - 1; i++) {
            if (auxArr[i] > auxArr[i + 1]) {
                shuffled = shuffle(auxArr);
                procedure = procedure.concat(shuffled[1]);
                auxArr = shuffled[0];
                continue outer;
            }
        }
        unsorted = false;
        
    }
    return procedure;


}

export { getBogoProcedure };