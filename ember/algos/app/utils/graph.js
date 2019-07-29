const MAX_INT = 1000000;
import Queue from '../utils/queue';

export default class Graph {
  constructor(size) {
    this.size = size;
    this.graph = new Array(size * size);
  }

  setEdge(i, j, c) {
    this.graph[i * this.size + j] = c;
  }

  getEdge(i, j) {
    return this.graph[i * this.size + j];
  }

  *getEdges (source) {
    for (let dest = 0; dest < this.size; dest++) {
      let cost = this.getEdge(source, dest);
      if (cost) {
        yield { source, dest, cost };
      }
    }
  }
}

export function shortestPath(graph, i, j) {
  const { size } = graph;
  let weights = new Array(size).fill(MAX_INT);
  let parents = new Array(size).fill(-1);
  weights[i] = 0;
  let queue = new Queue(size);
  queue.insertOrUpdate(i, 0);

  while (!queue.isEmpty()) {
    let current = queue.extractMin();
    let currentCost = weights[current];
    for (let { dest, cost } of graph.getEdges(current)) {
      let totalCost = currentCost + cost;
      if (totalCost < weights[dest]) {
        weights[dest] = totalCost;
        queue.insertOrUpdate(dest, totalCost);
        parents[dest] = current;
      }
    }
  }

  let results = [];
  while (j !== i) {
    let edge = [parents[j], j];
    results.push(edge);
    j = parents[j];
  }
  results = results.reverse();
  console.log(results);
}
