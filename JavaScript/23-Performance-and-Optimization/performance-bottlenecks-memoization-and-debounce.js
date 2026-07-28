/*
  Topic: Performance and optimization basics
  Difficulty: Intermediate
  Primary Concept: Spotting expensive work and reducing repeated effort
*/

console.log("--- Performance and optimization basics ---");

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const cacheKey = JSON.stringify(args);
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const result = fn(...args);
    cache.set(cacheKey, result);
    return result;
  };
}

const slowAdd = memoize((left, right) => left + right);
console.time("first call");
console.log("Memoized add:", slowAdd(4, 5));
console.timeEnd("first call");
console.time("second call");
console.log("Memoized add again:", slowAdd(4, 5));
console.timeEnd("second call");

function debounce(fn, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

const logSearch = debounce((term) => {
  console.log("Debounced search term:", term);
}, 50);

logSearch("j");
logSearch("ja");
logSearch("jav");

console.log("--- Notes ---");
console.log("Measure before optimizing, avoid repeated work, and batch expensive operations where possible.");
