// jshint esnext: true
// The Sieve of Eratosthenes
function findPrimes(max) {
  let flags = new Array(max + 1).fill(true);
  flags[0] = flags[1] = false;
  
  for (let i = 0; i <= Math.sqrt(max); i++) {
    if(!flags[i]) {
      continue;
    }
          
    for (let j = i * i; j <= max; j+= i) {
      if (flags[j]) {
        flags[j] = false;
      }
    }
  }
  
  return flags.reduce((primes, isPrime, i) => {
    if (isPrime) { primes.push(i); }
    return primes;
  }, []);
}

console.log(findPrimes(10000));
