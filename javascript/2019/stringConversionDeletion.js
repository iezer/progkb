// string conversion by deletion
// jshint esnext: true
// string conversion by deletion. Ex:
// How many ways can you convert abab -> ab by deleting 
// characters? answer is 3.

// 1. inefficient recursive solution
function recursiveWays(strA, strB, i = 0, j = 0) {
  if (i === strA.length || j === strB.length) {
    return 0;
  }
   
  if (strA.charAt(i) === strB.charAt(j)) {
    let useIt = (j === strB.length - 1) ? 1 : recursiveWays(strA, strB, i + 1, j + 1);
    let notUseIt = recursiveWays(strA, strB, i + 1, j);
    return useIt + notUseIt;
  }
  
  return recursiveWays(strA, strB, i + 1, j);
}

// 1 0 0
// 1 1 0
// 1 1 1
// 1 2 1
// 1 2 3
// Dynamic Programming
function matrixWays(strA, strB) {
  let m = new Array(strA.length + 1);
  for (let i = 0; i < m.length; i++) {
    m[i] = new Array(strB.length + 1).fill(0);
    m[i][0] = 1; // Can always do 1 empty string
  }
    
  for (let i = 1; i < strA.length + 1; i++) {
    for (let j = 1; j < strB.length + 1; j++) {
      let charA = strA.charAt(i - 1);
      let charB = strB.charAt(j - 1);
      if (charA === charB) {
        // using it + not using it
        m[i][j] = m[i - 1][j - 1] + m[i - 1][j];
      } else {
        m[i][j] = m[i - 1][j]; // not using it
      }
    }
  }
  
  console.log(m);
  return m[strA.length][strB.length];
}

// Can do above with just two rows.
function twoRowsWays(strA, strB) {
  let m = new Array(2);
  for (let i = 0; i < m.length; i++) {
    m[i] = new Array(strB.length + 1).fill(0);
    m[i][0] = 1; // Can always do 1 empty string
  }

  let currentRow = 0;
  
  for (let i = 1; i < strA.length + 1; i++) {
    for (let j = 1; j < strB.length + 1; j++) {
      let charA = strA.charAt(i - 1);
      let charB = strB.charAt(j - 1);
      
      currentRow = i % 2;
      let previousRow = (i - 1) % 2;
      
      if (charA === charB) {
        // using it + not using it
        m[currentRow][j] = m[previousRow][j - 1] + m[previousRow][j];
      } else {
        m[currentRow][j] = m[previousRow][j]; // not using it
      }
    }
  }
  
  console.log(m);

  return m[currentRow][strB.length];
}

console.log(recursiveWays("abab", "ab"));
console.log(matrixWays("abab", "ab"));
console.log(twoRowsWays("ababb", "ab"));
