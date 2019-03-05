function powerSets(a) {
  let numSets = Math.pow(2, a.length);
  let results = [];
  for (let i = 0; i < numSets; i++) {
    let chars = new Array(a.length);
    for (let j = 0; j < a.length; j++) {
      if (i & (0x01 << j)) {
        chars.push(a[j]);
      }
    }
    results.push(chars.join(''));
  }
  return results;
}

function powerSetsR(a, i = 0, s = [], r = []) {
  if (i === a.length) {
    r.push(s.join(''));
    return;
  }
  
  powerSetsR(a, i + 1, s, r);
  s[i] = a[i];
  powerSetsR(a, i + 1, s, r);
  s[i] = '';

  return r;
}

console.log(powerSets(["a", "b", "c"]));

console.log(powerSetsR(["a", "b", "c"]));
