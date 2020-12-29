export function getBubbleSortProcedures(arr) {
	let auxArr = arr;
	let procedures = [];

	for (let i = 0; i < auxArr.length - 1; i++) {
		for (let j = i + 1; j < auxArr.length; j++) {
			let first = auxArr[i];
			let second = auxArr[j];

			procedures.push({
				operation: 'color',
				index1: i,
				index2: j,
			});

			if (second < first) {
				procedures.push({
					operation: 'swap',
					index1: i,
					index2: j,
				});

				auxArr[i] = second;
				auxArr[j] = first;
			}
		}
	}

	return procedures;
}
