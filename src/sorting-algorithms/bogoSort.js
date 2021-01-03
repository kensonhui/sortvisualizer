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
            procedure.push({
                operation: 'visit',
                index1: i,
                index2: i + 1
            });
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



let sortAnimate = (procedure, swapRects, SPEED, COLORS, audioPlayer, min = 50, max = 500) => {
	let time = SPEED;
	for (let i = 0; i < procedure.length; i++) {
		let a = procedure[i].index1;
		let b = procedure[i].index2;
		let idA = `rect-${a}`;
        let idB = `rect-${b}`;
        let rectA = document.getElementById(idA);
        let rectB = document.getElementById(idB);
        //let note = (Number((rectB.style.height.slice(0, -2)) - min)/(max - min) * 85 + 21);
        
        
		if (procedure[i].operation === 'swap') {
			setTimeout(() => {
				rectA.style.backgroundColor = COLORS['SWAPPED'];
                rectB.style.backgroundColor = COLORS['SWAPPED'];
			}, time);

			time += SPEED;
			setTimeout(() => {
                swapRects(a, b);
                audioPlayer.playNote(Number((rectB.style.height.slice(0, -2)) - min)/(max - min) * 85 + 21);
			}, time);

			time += SPEED;
			setTimeout(() => {
				// order matters
				rectB.style.backgroundColor = COLORS['PRIMARY'];
                document.getElementById(idA).style.backgroundColor = COLORS['SORTED'];
			}, time);
		} else if (procedure[i].operation === 'flag') {
			setTimeout(() => {
				let x = document.getElementsByClassName('flagged');

				while (x.length) {
					if (x[0].style.backgroundColor != COLORS['SORTED']) {
						x[0].style.backgroundColor = COLORS['PRIMARY'];
					}

					x[0].classList.remove('flagged');
				}

				let c = procedure[i].index;
				let idC = `rect-${c}`;

				document.getElementById(idC).classList.add('flagged');
				document.getElementById(idC).style.backgroundColor = 'pink';
			}, time);

			time += SPEED;
		} else {
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = COLORS['VISITED'];
                rectB.style.backgroundColor = COLORS['VISITED'];
                audioPlayer.playNote(Number((rectB.style.height.slice(0, -2)) - min)/(max - min) * 85 + 21);
			}, time);

			time += SPEED;
			setTimeout(() => {
				// exploit selection sort
				rectB.style.backgroundColor = COLORS['PRIMARY'];
			}, time);
		}
	}
};

export { getBogoProcedure, sortAnimate };