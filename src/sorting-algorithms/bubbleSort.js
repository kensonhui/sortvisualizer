function getBubbleProcedure(arr) {
	let auxArr = arr;
	let procedure = [];

	for (let i = 0; i < auxArr.length - 1; i++) {
		for (let j = i + 1; j < auxArr.length; j++) {
			let first = auxArr[i];
			let second = auxArr[j];

			procedure.push({
				operation: 'visit',
				index1: i,
				index2: j,
			});

			if (second < first) {
				procedure.push({
					operation: 'swap',
					index1: i,
					index2: j,
				});

				auxArr[i] = second;
				auxArr[j] = first;
			}
		}
	}

	return procedure;
}

function bubbleAnimate(procedure, swapRects, SPEED, COLORS) {
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
				document.getElementById(idA).style.backgroundColor = COLORS['PRIMARY'];
				document.getElementById(idB).style.backgroundColor = COLORS['PRIMARY'];
			}, time);
		} else {
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = COLORS['VISITED'];
				document.getElementById(idB).style.backgroundColor = COLORS['VISITED'];
			}, time);

			time += SPEED;
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = COLORS['PRIMARY'];
				document.getElementById(idB).style.backgroundColor = COLORS['PRIMARY'];
			}, time);
		}
	}
}

export { getBubbleProcedure, bubbleAnimate };
