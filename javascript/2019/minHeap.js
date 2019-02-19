class HeapNode {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class MinHeap {
  constructor(capacity = 4, maxValue = 20) {
    this.capacity = capacity;
    this.maxValue = maxValue;
    this.heap = new Array(capacity);
    this.positions = new Array(maxValue).fill(-1);
    this.size = 0;
  }
  
  swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
    this.positions[this.heap[i].value] = i;
    this.positions[this.heap[j].value] = j;
  } 
  
  parent(i) { return Math.floor((i - 1) / 2); }
  
  insert(v, p) {
    let { size, capacity, heap } = this;
    if (size === capacity) {
      this.heap = this.heap.concat(new Array(capacity));
      this.capacity = capacity * 2;
    }
    
    this.heap[size] = new HeapNode(v, p);
    this.positions[v] = size;
    let i = size;
    this.size = this.size + 1;

    while(i > 0 && this.heap[i].priority < this.heap[this.parent(i)].priority) {
      let parent = this.parent(i);
      this.swap(i, parent);
      i = parent;
    }
  }
  
  decreaseKey(v, p) {
    let i = this.positions[v];
    this.heap[i].priority = p;
    
    while(i > 0 && this.heap[i].priority < this.heap[this.parent(i)].priority) {
      let parent = this.parent(i);
      this.swap(i, parent);
      i = parent;
    }
  }
  
  minHeapify(i) {
    let left = (i * 2) + 1;
    let right = (i * 2) + 2;
    let smallest = i;
    if (left < this.size && this.heap[left].priority < this.heap[smallest].priority) {
      smallest = left;
    }
    if (right < this.size && this.heap[right].priority < this.heap[smallest].priority) {
      smallest = right;
    }
    
    if (smallest !== i) {
      this.swap(smallest, i);
      this.minHeapify(smallest);
    }
  }
  
  extractMin() {
    if (this.size <= 0) { return null; }
    let min = this.heap[0].value;
    this.heap[0] = this.heap[this.size - 1];
    this.positions[this.heap[0].value] = 0;
    this.size = this.size - 1;
    this.minHeapify(0);
    return min;
  }
}
