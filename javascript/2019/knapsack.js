function twoDimArray(x, y, initVal = -1) {
  let a = new Array(x);
  for (let i = 0; i < a.length; i++) {
    a[i] = new Array(y).fill(initVal);
  }
  return a;
}

function knapsackDynamic(values, weights, W, memo, current = 0) {
    memo = memo || twoDimArray(values.length, W + 1);
  
    for (let i = 0; i < values.length; i++) {
      for (let w = 0; w <= W; w++) {
        if (i === 0) {
          memo[i][w] = weights[i] > w ? 0 : values[i];
          continue;
        }
        
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
  
    return memo;
}
