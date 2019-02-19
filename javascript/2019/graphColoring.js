// jshint esnext: true
// Graph Coloring 
// https://www.geeksforgeeks.org/graph-coloring-set-2-greedy-algorithm/

class UndirectedGraph {
  constructor(V) {
    this.V = V;
    this.grid = new Array(V);
    for (let i = 0; i < V; i++) {
      this.grid[i] = new Array(V).fill(0);
    }
  }
  
  addEdge(x, y) {
    this.grid[x][y] = 1;
    this.grid[y][x] = 1;
  }
  
  coloring() {
    const {grid, V} = this;

    let result = new Array(V).fill(-1);
    result[0] = 0;
    
    let assigned = new Array(V).fill(false);
  
    for (let u = 1; u < V; u++) {
      // process all adjacent nodes and mark
      for (let n = 0; n < V; n++) {
        if (grid[u][n] !== 0 && result[n] !== -1) {
          assigned[result[n]] = true;
        }
      }
      
      let cr = 0;
      for (cr = 0; cr < V; cr++) {
        if (!assigned[cr]) {
          break;
        }
      }
    
      result[u] = cr;
    
      // reset values back to false.
      for (let n = 0; n < V; n++) {
        if (grid[u][n] !== 0 && result[n] !== -1) {
          assigned[result[n]] = false;
        }
      }
    }
  
    return result;
  }
}
let V = 5;
let g1 = new UndirectedGraph(V);
    g1.addEdge(0, 1); 
    g1.addEdge(0, 2); 
    g1.addEdge(1, 2); 
    g1.addEdge(1, 3); 
    g1.addEdge(2, 3); 
    g1.addEdge(3, 4); 
let g2 = new UndirectedGraph(V);
    g2.addEdge(0, 1); 
    g2.addEdge(0, 2); 
    g2.addEdge(1, 2); 
    g2.addEdge(1, 4); 
    g2.addEdge(2, 4); 
    g2.addEdge(4, 3);
let result = g2.coloring();
for (let i = 0; i < V; i++) {
  console.log(`Vertex ${i} colored ${result[i]}`);
}
