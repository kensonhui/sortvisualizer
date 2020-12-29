let procedures = [];

let bubbleSort = (arr) => {
	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			let first = arr[i];
			let second = arr[j];

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

				arr[i] = second;
				arr[j] = first;
			}
		}
	}
	return procedures;
};

/*
let list = [9, 4, 2, 7, 2, 8, 1];
console.log(list + '\n');
let sorted = bubbleSort(list);
console.log(sorted + '\n');

for (let i = 0; i < procedures.length; i++) {
	console.log(procedures[i].operation + '\n');
}
*/
