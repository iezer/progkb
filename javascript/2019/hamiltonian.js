//jshint esnext:true
// Hamiltonian Cycle
// https://www.geeksforgeeks.org/hamiltonian-cycle-backtracking-6/

//works
let graph = [ 
  [0, 1, 0, 1, 0], 
  [1, 0, 1, 1, 1],  
  [0, 1, 0, 0, 1,],
  [1, 1, 0, 0, 1],  
  [0, 1, 1, 1, 0] 
  ];

// no solution;
let badGraph = [ 
[0, 1, 0, 1, 0], 
[1, 0, 1, 1, 1],  
[0, 1, 0, 0, 1,], 
[1, 1, 0, 0, 0],  
[0, 1, 1, 0, 0]];
        

function recursiveHam(graph, path, current) {
  if (current === graph.length) {
    let start = path[0];
    let finish = path[graph.length - 1];
    // There must be an edge between the first and last node
    return graph[start][finish] > 0;
  }
  
  for(let i = 1; i < graph.length; i++) {
    if (graph[current][i] > 0 && !path.includes(i)) {
      path[current] = i;
      
      if (recursiveHam(graph, path, current + 1)) {
        return true;
      }
      
      path[current] = -1;
    }
  }
  
  return false;
}

function findCycle(graph) {
  let nodes = graph.length;
  let path = new Array(nodes).fill(-1);
  path[0] = 0;
  
  let current = 0;
  
  return recursiveHam(graph, path, 1);
}

console.log(`has hamiltonian cycle ${findCycle(graph)}`)
