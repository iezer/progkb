// primms with generator
//jshint esnext: true

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

function mst(g) {
  const { size } = g;
  let seen = new Array(size).fill(false);
  let weights = new Array(size).fill(MAX_INT);
  let previous = new Array(size).fill(-1);

  weights[0] = 0;
  
  for (let count = 0; count < size - 1; count++) {
    let current = -1;
    let minValue = MAX_INT;
    for (let j = 0; j < size; j++) {
      if (!seen[j] && weights[j] < minValue) {
        current = j; minValue = weights[j];
      }
    }

    seen[current] = true;

    for (let j = 0; j < size; j++) {
      const cost = g.getEdge(current, j);
      if (cost > 0 && cost < weights[j] && !seen[j]) {
        weights[j] = cost;
        previous[j] = current;
      }
    }
  }
  return { weights, previous };
}

function preorder(current, previous, route = []) {
    route.push(current);
    for (let finish = 0; finish < previous.length; finish++) {
      let start = previous[finish];
      if (start !== current || route.includes(finish)) { continue; }
      preorder(finish, previous, route);
    }
    return route;
}

let { weights, previous } = mst(g);
let route = preorder(0, previous);
console.log("traveling salesman route: " + route); // expected [0,1,2,4,3]
