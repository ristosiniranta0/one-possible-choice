/*
  File: complex_code.js

  Description: 
  This code demonstrates a complex algorithm for finding all prime numbers up to a given limit using the Sieve of Eratosthenes.

  Author: John Doe
*/

// Function to find all prime numbers up to a given limit using the Sieve of Eratosthenes algorithm
function findPrimes(limit) {
  // Step 1: Create an array to store the prime status of numbers (true if prime, false if composite)
  var primes = new Array(limit + 1).fill(true);

  // Step 2: Iterate through numbers from 2 up to the square root of the limit (inclusive)
  for (var i = 2; i * i <= limit; i++) {
    // Step 3: If the current number is prime
    if (primes[i]) {
      // Step 4: Mark all multiples of the prime as composite
      for (var j = i * i; j <= limit; j += i) {
        primes[j] = false;
      }
    }
  }

  // Step 5: Collect all the prime numbers
  var primeNumbers = [];
  for (var i = 2; i <= limit; i++) {
    if (primes[i]) {
      primeNumbers.push(i);
    }
  }

  // Step 6: Return the prime numbers array
  return primeNumbers;
}

// Example usage of the findPrimes function
var primesUpTo100 = findPrimes(100);
console.log("Prime numbers up to 100:", primesUpTo100);

// Another example usage of the findPrimes function
var primesUpTo1000 = findPrimes(1000);
console.log("Prime numbers up to 1000:", primesUpTo1000);

// And another example usage of the findPrimes function
var primesUpTo10000 = findPrimes(10000);
console.log("Prime numbers up to 10000:", primesUpTo10000);

// ... Continue using the findPrimes function with different limits as needed

/*
  Note:
  This code can be optimized further, but is intentionally kept simple and straightforward for readability and comprehension purposes.
*/