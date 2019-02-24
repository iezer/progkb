// quicksort singly linked list

class Node {
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}

function partition(head, tail) {
  let pivot = head;
  let current = pivot.next;
  pivot.next = tail;
  while (current && current !== tail) {
    let next = current.next;
    
    if (current.key < pivot.key) {
      current.next = head;
      head = current;
    } else {
      current.next = pivot.next;
      pivot.next = current;
    }
    
    current = next;
  }
  
  return { head: head, pivot: pivot };
}

function quickSort(root, tail) {
  if (!root || root === tail) { return root; }
  let { head, pivot } = partition(root, tail);
  let left = quickSort(head, pivot);
  let right = quickSort(pivot.next, tail);
  pivot.next = right;
  return left;
}

function print(n) {
  let r = [];
  while(n) {
    r.push(n.key);
    n = n.next;
  }
  console.log(r.join(", "));
}

let a = [3, 5, 6, 2, 1, 7];
let h = new Node(a[0]);
let current = h;
for (let i = 1; i < a.length; i++) {
  current.next = new Node(a[i]);
  current = current.next;
}

print(h);
let q = quickSort(h);
print (q);
