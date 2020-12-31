function getInsertionProcedure(arr) {
  let auxArr = arr;
  let procedure = [];

  // Traverse through length of array, starting with the element at index 0.
  for (var i = 0; i < auxArr.length; i++) {
      // Our current place in the unsorted portion of the auxArr.
      // currentUnsortedItem is the item we will be moving into the "sorted" subset of our auxArr.
      procedure.push({
        operation: 'flag',
        index: i
      });

      var currentUnsortedItem = auxArr[i];

      // Iterate through sorted items.
      // If the current unsorted item is smaller than the item to its left,
      // move the current item back one position in the auxArr.
      // This loop will never run for the very first unsorted item at index 0.
      for (var j = i; j > 0 && currentUnsortedItem < auxArr[j - 1]; j--) {

        // Shift item left in the sorted subset of the auxArr.
        procedure.push({
          operation: 'swap',
          index1: j,
          index2: j - 1
        })
        auxArr[j] = auxArr[j - 1];
      }

      // Shift item to the right in the sorted subset fo the auxArr.
     
      auxArr[j] = currentUnsortedItem;
  }
  
  return procedure;
}

//Example Usage:
// let myArray = [2, 4, 1, 6, -7, 8, 5, 9, 3, 4];
// console.log(insertionSort(myArray));

export { getInsertionProcedure };