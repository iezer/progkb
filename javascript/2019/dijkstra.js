// dijkstra with generator
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
  * getEdges(i) {
    for (let j = 0; j < this.size; j++) {
      let cost = this.getEdge(i, j);
      if (cost > 0) {
        yield { dest: j, cost: cost };
      }
    }
  }
  shortestPath(i, j) {
    let weights = new Array(this.size).fill(MAX_INT);
    let previous = new Array(this.size).fill(-1);
    weights[i] = 0;
    let q = new Queue(this.size);
    q.insertOrUpdate(i, 0);
    while(!q.isEmpty()) {
      let currentIndex = q.extractMin();
      let currentCost = weights[currentIndex];
      let edges = this.getEdges(currentIndex);
      for (let {dest, cost} of edges) {
        let totalCost = currentCost + cost;
        if (totalCost < weights[dest]) {
          weights[dest] = totalCost;
          previous[dest] = currentIndex;
          q.insertOrUpdate(dest, totalCost);
        }
      }
    }
    
    let results = [];
    while (j !== i) {
      let edge = [previous[j], j];
      results.push(edge);
      j = previous[j];
    }
    
    results = results.reverse();
    for (let c = 0; c < results.length; c++) {
      let edge = results[c];
      console.log(`${edge[0]} -> ${edge[1]} (${this.getEdge(...edge)})`);
    }
    return results;
  }
}
class Queue {
  constructor(size) {
    this.size = size;
    this.queue = new Array(size).fill(-1);
  }
  
  insertOrUpdate(v, cost) {
    this.queue[v] = cost;
  }
  
  getMin() {
    let minIndex = -1;
    let minValue = MAX_INT;
    for (let i = 0; i < this.size; i++) {
      if (this.queue[i] !== -1 && this.queue[i] < minValue) {
        minValue = this.queue[i];
        minIndex = i;
      }
    }
    return minIndex;
  }
  extractMin() {
    let min = this.getMin();
    this.queue[min] = -1;
    return min;
  }
  isEmpty() { return this.getMin() === -1; }
}

let graph = new Graph(5);
graph.setEdge(0, 1, 10);
graph.setEdge(0, 4, 3);
graph.setEdge(1, 2, 2);
graph.setEdge(1, 4, 4);
graph.setEdge(2, 3, 9);
graph.setEdge(3, 2, 7);
graph.setEdge(4, 1, 1);
graph.setEdge(4, 2, 8);
graph.setEdge(4, 3, 2);
graph.shortestPath(0, 2);
