// merge sort singly linked list
// jshint esnext: true
class Node {
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}

function findMiddle(left, right) {
  let runner = left;
  while(runner) {
    if (!runner || runner === right) { return left; }
    runner = runner.next;
    if (!runner || runner === right) { return left; }
    runner = runner.next;
    left = left.next;
  }
  return left;
}

function mergeSort(left, right) {
  if (!left) { return left; }
  if (left === right) { return left; }
  
  let middle = findMiddle(left, right);
  let rightStart = middle.next;
  middle.next = null;
  
  let a = mergeSort(left, middle);
  let b = mergeSort(rightStart, right);
  return merge(a, b);
}

function merge(left, right) {
  if (!left) { return right; }
  if (!right) { return left; }
  let head;
  if (left.key < right.key) {
    head = left;
    left = left.next;
  } else {
    head = right;
    right = right.next;
  }
  
  let current = head;
  while (left && right) {
    if (left.key < right.key) {
      current.next = left;
      left = left.next;
    } else {
      current.next = right;
      right = right.next;
    }
    current = current.next;
  }
  
  if (!left) {
    current.next = right;
  } else {
    current.next = left;
  }
  return head;
}

function print(n) {
  let r = [];
  while(n) {
    r.push(n.key);
    n = n.next;
  }
  console.log(r.join(", "));
}

function createList(a) {
  let h = new Node(a[0]);
  let current = h;
  for (let i = 1; i < a.length; i++) {
    current.next = new Node(a[i]);
    current = current.next;
  }
  return h;
}


let a = createList([3, 5, 8, 10]);
let b = createList([1, 2, 7, 9]);
let c = createList([9, 7, 8 ,3, 1, 5, 2, 10]);
let d = createList([3, 5, 6, 2, 1, 7]);
// print(merge(a, b));
print(c);
print(mergeSort(c));
