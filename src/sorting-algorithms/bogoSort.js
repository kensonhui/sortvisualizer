function bogo(arr) {
  var shuffleCount = 0;
  function shuffle(arr) {
    var shuffled = [];
    var rand;
    while (arr.length !== 0) {
      rand = Math.floor(Math.random() * arr.length)
      shuffled.push(arr.splice(rand, 1)[0]);
    }
    return shuffled;
  }

  function sorted(shuffle) {
    for (var i = 0; i < shuffle.length - 1; i++) {
      if (shuffle[i] <= shuffle[i + 1]) {
        continue;
      } else {
        return false;
      }
    }
    return true
  }
  
  do {
    shuffleCount++;
    arr = shuffle(arr);
  } while (!sorted(arr))
  
  return shuffleCount + ' | ' + arr.join();
}

console.log(bogo([1, 2,3,4]));