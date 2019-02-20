// primms with generator
//jshint esnext: true
//noprotect
console.log('start');
const MAX_INT = Number.MAX_SAFE_INTEGER;

class Graph {
  constructor(size, isUndirected = false) {
    this.size = size;
    this.isUndirected = isUndirected;
    this.graph = new Array(size * size).fill(0);
  }
  
  getEdge(i, j) {
    return this.graph[i * this.size + j];
  }
  
  setEdge(i, j, c) {
    this.graph[i * this.size + j] = c;
    if (this.isUndirected) {
      this.graph[j * this.size + i] = c;
    }
  }
  
  * edges(v) {
    for (let i = 0; i < this.size; i++) {
      let cost = this.getEdge(v, i);
      if (cost > 0) {
        yield { target: i, cost: cost };
      }
    }
  }
}

let g = new Graph(5, true);

[
  [0, 1, 2],
  [0, 3, 6],
  [1, 2, 3],
  [1, 3, 8],
  [1, 4, 5],
  [2, 4, 7],
  [3, 4, 9]
].forEach(([i,j,c]) => g.setEdge(i, j, c));

let it = g.edges(1);
for (let edge of it) {
  console.log(`1 -> ${edge.target} (${edge.cost})`);
}

class HeapNode {
  constructor(v, p) {
    this.value = v;
    this.priority = p;
  }
}

class MinHeap {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.heap = new Array(capacity).fill(0);
    this.positions = new Array(capacity).fill(-1);
  }
  
  insert(value, priority) {
    priority = priority || value;
    let i = this.positions[value];

    if (i !== -1) {
      this.heap[i].priority = priority;
      return this.bubbleUp(i);
    }
    
    i = this.size;
    this.size = this.size + 1;
    this.heap[i] = new HeapNode(value, priority);
    this.positions[value] = i;
    this.bubbleUp(i);
  }
  
  parent(i) {
    if (i <= 0) { return 0; }
    return Math.floor((i - 1) / 2);
  }
  
  swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
    this.positions[this.heap[i].value] = i;
    this.positions[this.heap[j].value] = j;
  }
  bubbleUp(i) {
    let p = this.parent(i);
    while (i >= 0 && this.heap[i].priority < this.heap[p].priority) {
      this.swap(i, p);
      i = p;
      p = this.parent(i);
    }
  }
  
  bubbleDown(i) {
    const { size, heap } = this;
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    let smallest = i;
    
    if (left < size && heap[left].priority < heap[smallest].priority) {
      smallest = left;
    }
    
    if (right < size && heap[right.priority] < heap[smallest].priority) {
      smallest = right;
    }
    
    if (smallest !== i) {
      this.swap(i, smallest);
      this.bubbleDown(smallest);
    }
  }
  
  extractMin() {
    const { heap, size } = this;
    if (size <= 0) { return; }
    let minValue = this.heap[0].value;
    this.size--;
    this.heap[0] = this.heap[size - 1];
    this.positions[this.heap[0].value] = 0;
    this.positions[minValue] = -1;
    this.bubbleDown(0);
    return minValue;
  }
}

function mst(g) {
  const { size } = g;
  let seen = new Array(size).fill(false);
  let weights = new Array(size).fill(MAX_INT);
  let previous = new Array(size).fill(-1);
  let q = new MinHeap(size);
  q.insert(0, 0);
  weights[0] = 0;
  
  for (let i = 0; i < size - 1; i++) {
    let current = q.extractMin();
    seen[current] = true;
    let edgeIt = g.edges(current);
    for (let edge of edgeIt) {
      const { target, cost } = edge;
      if (cost < weights[target] && !seen[target]) {
        weights[target] = cost;
        previous[target] = current;
        q.insert(target, cost);
      }
    }
  }
  return { weights, previous };
}

console.log(mst(g));
console.log('finish');
