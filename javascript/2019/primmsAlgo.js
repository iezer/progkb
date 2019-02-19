//jshint esnext:true
// Primms Algo MST
const MAX_INT = Number.MAX_SAFE_INTEGER;

const graph = [ 
  [0, 2, 0, 6, 0], 
            [2, 0, 3, 8, 5], 
            [0, 3, 0, 0, 7], 
            [6, 8, 0, 0, 9], 
            [0, 5, 7, 9, 0]];

const nodes = 5;

let parents = new Array(nodes);
let weights = new Array(nodes).fill(MAX_INT);
let seen = new Array(nodes);

weights[0] = 0;
let currentWeight = 0;
let currentIndex = 0;
let parentIndex = -1;
parents[0] = -1;

for(let count = 0; count < nodes; count++) {
  console.log(`current ${currentIndex} ${currentWeight} ${parents} ${weights} ${seen}`);
  
   // find min unseen
  let minWeight = MAX_INT;
  let minIndex = -1;
  for (let m = 0; m < nodes; m++) {
    if (weights[m] < minWeight && !seen[m]) {
      minIndex = m;
      minWeight = weights[m];
    }
  }
  
  seen[minIndex] = true;
  
  // Update weights for neighbours
  for(let j = 0; j < nodes; j++) {
    if (!seen[j] && graph[minIndex][j] > 0 && currentWeight + graph[minIndex][j] < weights[j]) {
      weights[j] = graph[minIndex][j];
      parents[j] = minIndex;
    }
  }
}

console.debug(parents);
console.debug(weights);
/* expected answer
1 - 0 (2)
2 - 1 (3)
3 - 0 (6)
4 - 1 (5)
*/
