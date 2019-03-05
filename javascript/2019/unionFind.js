// union find with generator
// https://www.geeksforgeeks.org/union-find-algorithm-set-2-union-by-rank/
// jshint esnext: true
// noprotect

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
  setEdge(i, j, value) { 
    this.graph[i * this.size + j] = value;
    if (this.isUndirected) {
      this.graph[j * this.size + i] = value;
    }
  }
  * getAllEdges() {
    for (let i = 0; i < this.size; i++) {
      for (let j = i + 1; j < this.size; j++) {
        let cost = this.getEdge(i, j);
        if (cost > 0) {
          yield { src: i, dest: j, cost: cost };
        }
      }
    }
  }
  
  isCyclic() {
    let rank = new Array(this.size).fill(0);
    let parents = new Array(this.size);
    for (let i = 0; i < parents.length; i++) {
      parents[i] = i;
    }
    
    let getParent = (i) => {
      if (parents[i] === i) { return i; }
      
      let p = getParent(parents[i]);
      parents[i] = p;
      return p;
    };
    
    let union = (x, y) => {
      if (rank[x] < rank[y]) {
        parents[x] = y;
      } else if (rank[y] < rank[x]) {
        parents[y] = x;
      } else {
        parents[x] = y;
        rank[y] = rank[y] + 1;
      }
    };
    
    let edges = this.getAllEdges();
    for (let edge of edges) {
      let x = getParent(edge.src);
      let y = getParent(edge.dest);
      if (x === y) {
        return true;
      }
      union(x, y);
    }
    console.log(parents);
    console.log(rank);
    return false;
  }
}

let graph = new Graph(3);
graph.setEdge(0, 1, 10);
graph.setEdge(0, 2, 3);
graph.setEdge(1, 2, 2);
console.log(graph.isCyclic());
