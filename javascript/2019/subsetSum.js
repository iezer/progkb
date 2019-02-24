// https://www.geeksforgeeks.org/subset-sum-problem-dp-25/
// jshint esnext: true

function hasSum(set, sum) {
  let k = new Array(set.length);
  for (let i = 0; i < set.length; i++) {
    k[i] = new Array(sum + 1).fill(false);
    k[i][0] = true;
  }
  
  let val = set[0];
  k[0][val] = true;
  
  for (let i = 1; i < set.length; i++) {
    let val = set[i];
    
    for (let j = 1; j <= sum; j++) {
      if (j < val || k[i - 1][j]) {
        k[i][j] = k[i - 1][j];
        continue;
      }
      
      if (j === val) {
        k[i][j] = true;
        continue;
      }
      

      k[i][j] = k[i - 1][j - val];
    }
  }
  return k[set.length - 1][sum];
}

let set = [3, 34, 4, 12, 5, 2]; 
console.log(hasSum(set, 9));
console.log(hasSum(set, 13));
