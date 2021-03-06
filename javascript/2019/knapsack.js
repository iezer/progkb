// knapsack dynamic
//jshint esnext: true
function twoDimArray(x, y, initVal = 0) {
  let a = new Array(x);
  for (let i = 0; i < a.length; i++) {
    a[i] = new Array(y).fill(initVal);
  }
  return a;
}

function knapsackDynamic(values, weights, W) {
  let memo = twoDimArray(values.length, W);

  for (let w = weights[0]; w <= W; w++) {
    memo[0][w] = values[0];
  }
  
  for (let i = 1; i < values.length; i++) {
    for (let w = 0; w <= W; w++) {
      if (weights[i] > w) {
        memo[i][w] = memo[i-1][w];
        continue;
      }
      
      memo[i][w] = Math.max.apply(null, [
        values[i] + memo[i-1][w - weights[i]],
        memo[i-1][w]
      ]);
    }
  }
  
  let maxValue = memo[values.length - 1][W];

  let selectedNodes = [];
  for (let i = values.length - 1; i >= 0; i--) {
    let isUsed = i === 0 ? 
        memo[i][W] > 0 : 
        memo[i][W] !== memo[i-1][W];
  if (isUsed) {
    selectedNodes.push(i);
    W = W - weights[i];
  }
}
  
  return { maxValue: maxValue, selectedNodes: selectedNodes };
}

let values = [60, 100, 120];
let weights = [10, 20, 30];
let W = 50;

console.log(knapsackDynamic(values, weights, W));
