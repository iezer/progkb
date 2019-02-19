function mergeSort(array) {
  let helper = new Array(array.length);
  return mergeSortInPlace(array, helper, 0, array.length -1); 
}
function mergeSortInPlace(array, helper, left, right) {
  if (left < right) {
    let middle = (left + right) / 2;
    mergeSortInPlace(array, helper, left, middle);
    mergeSortInPlace(array, helper, middle + 1, right);
    merge(array, helper, left, middle, right);
  }
}

function merge(array, helper, left, middle, right) {
  for (let k = left ; k <= right; k++) {
    helper[k] = array[k];
  }
  let helperLeft = left;
  let helperRight = middle + 1;
  let current = left;
  while (helperLeft <= middle && helperRight <= right) {
    if (helper[helperLeft] <= helper[helperRight]) {
      array[current++] = helper[helperLeft++];
    } else {
      array[current++] = helper[helperRight++];
    }
  }
  while(helperLeft <= middle && current <= right) {
    array[current++] = helper[helperLeft++];
  }
}
