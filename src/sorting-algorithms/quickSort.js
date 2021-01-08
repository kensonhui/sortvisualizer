var procedureQuick = [];

function partition(arr, start, end) {
	// Taking the first element as the pivot
	const pivotValue = arr[start];
	let pivotIndex = start + 1;
	procedureQuick.push({
		operation: 'pivot',
		index1: start
	});
	for (let i = pivotIndex; i < end; i++) {
		if (arr[i] < pivotValue) {
			// Swapping elements
			[arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

			// Moving to next element
			
			procedureQuick.push({
				operation: 'visit',
				index1: i,
			},{
				operation: 'swap',
				index1: i,
				index2: pivotIndex
			});
			pivotIndex++;
		} else {
			procedureQuick.push({
				operation: 'visit',
				index1: i,
			});
		}
	}

	// Putting the pivot value in the middle
	[arr[pivotIndex - 1], arr[start]] = [arr[start], arr[pivotIndex - 1]];
	procedureQuick.push({
		operation: 'swap',
		index1: start,
		index2: pivotIndex - 1
	},{
		operation: 'lock',
		index1: pivotIndex - 1,
	});
	return [arr, pivotIndex];
}

function getQuickProcedure(arr, start, end) {
	// Base case or terminating case
	if (start >= end){
		return arr;
	} else {
		let arrNew = partition(arr, start, end);
		let arrr = arrNew[0];
		let index = arrNew[1];
		
		return getQuickProcedure(getQuickProcedure(arrr, index , end), start, index - 1);
	}
}

function quickAnimate(procedure, swapRects, SPEED, COLORS) {
	let time = SPEED;

	for (let i = 0; i < procedure.length; i++) {
		let a = procedure[i].index1;
		let idA = `rect-${a}`;
		if (procedure[i].operation === 'swap') {
			let b = procedure[i].index2;
			let idB = `rect-${b}`;
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
		} else if (procedure[i].operation === 'pivot') {
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = "red";
			
			}, time);

		} else if (procedure[i].operation === 'lock') {
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = "Blue";
			
			}, time);
		}

		else {
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = COLORS['VISITED'];
			
			}, time);

			time += SPEED;
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = COLORS['PRIMARY'];
				
			}, time);
		}
	}
}

export { getQuickProcedure, quickAnimate, procedureQuick };