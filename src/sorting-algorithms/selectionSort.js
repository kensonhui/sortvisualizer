let procedure = [];

function getSelectionProcedure(arr) {
	let indexOfMin;
	let aux;
	let len = arr.length;

	for (let i = 0; i < len; i++) {
		indexOfMin = i;

		for (let j = i + 1; j < len; j++) {
			procedure.push({
				operation: 'visit',
				index1: i,
				index2: j,
			});

			if (arr[j] < arr[indexOfMin]) {
				indexOfMin = j;
				procedure.push({
					operation: 'flag',
					index: indexOfMin,
				});
			}
		}

		procedure.push({
			operation: 'swap',
			index1: i,
			index2: indexOfMin,
		});

		[arr[i], arr[indexOfMin]] = [arr[indexOfMin], arr[i]];
	}

	return procedure;
}

let selectionAnimate = (procedure, swapRects, SPEED, COLORS) => {
	console.log(procedure);
	let time = SPEED;
	for (let i = 0; i < procedure.length; i++) {
		let a = procedure[i].index1;
		let b = procedure[i].index2;
		let idA = `rect-${a}`;
		let idB = `rect-${b}`;

		if (procedure[i].operation === 'swap') {
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = COLORS['SWAPPED'];
				document.getElementById(idB).style.backgroundColor = COLORS['SWAPPED'];
			}, time);

			time += SPEED;
			setTimeout(() => {
				swapRects(a, b);
			}, time);

			time += SPEED;
			setTimeout(() => {
				// order matters
				document.getElementById(idB).style.backgroundColor = COLORS['PRIMARY'];
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
				document.getElementById(idB).style.backgroundColor = COLORS['VISITED'];
			}, time);

			time += SPEED;
			setTimeout(() => {
				// exploit selection sort
				document.getElementById(idB).style.backgroundColor = COLORS['PRIMARY'];
			}, time);
		}
	}
};

export { getSelectionProcedure, selectionAnimate };
