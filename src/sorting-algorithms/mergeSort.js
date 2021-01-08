// const myArray = [2, 4, 1, 6, -7, 8, 5, 9, 3, 4];
var procedureMerge = [];
var index = 0;

const mergeSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }

    let midIdx = Math.floor(arr.length / 2);
    let left = arr.slice(0, midIdx);
    let right = arr.slice(midIdx);
    for (let i = 0; i < midIdx; i++) {
        procedureMerge.push({
            operation: 'left',
            index1: i
        })
    }
    for (let j = midIdx; j < arr.length; j++) {
        procedureMerge.push({
            operation: 'right',
            index1: j
        })
    }
    let leftSorted = mergeSort(left);
    let rightSorted = mergeSort(right);
   
    return merge(leftSorted, rightSorted);

};

const merge = (arr1, arr2) => {
    let merged = [];
    
    while (arr1.length && arr2.length) {
        if (arr1[0] < arr2[0]) {
            merged.push(arr1.shift());
            procedureMerge.push({
                operation: 'add',
                index1: 0,
                index2: index
            })
           index++;
        } else {
            merged.push(arr2.shift());
            procedureMerge.push({
                operation: 'add',
                index1: arr1.length,
                index2: index
            })
            index++;
        }
    }
index=0;
    return [...merged, ...arr1, ...arr2];
};

function mergeAnimate(procedure, addRects, SPEED, COLORS) {
	let time = SPEED;

	for (let i = 0; i < procedure.length; i++) {
		let a = procedure[i].index1;
		let idA = `rect-${a}`;
		if (procedure[i].operation === 'add') {
			let b = procedure[i].index2;
			let idB = `rectInvis-${b}`;
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = COLORS['SWAPPED'];
				
			}, time);

			time += SPEED;
			setTimeout(() => {
				addRects(a, b);
			}, time);

			time += SPEED;
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = COLORS['PRIMARY'];
				
			}, time);
		} else if (procedure[i].operation === 'left') {
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = "red";
			
			}, time);

		} else if (procedure[i].operation === 'right') {
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = "Black";
			
			}, time);
		} else {
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = "Green";
			
			}, time);

			time += SPEED;
			setTimeout(() => {
				document.getElementById(idA).style.backgroundColor = "Green";
				
			}, time);
		}
	}
}

//example Usage:
// let myArray = [2, 4, 1, 6, -7, 8, 5, 9, 3, 4];
// console.log(mergeSort(myArray));
export { mergeSort, mergeAnimate, procedureMerge};