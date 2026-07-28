/*
  Topic: Truthy, Falsy, and NaN Checks
  Difficulty: Beginner
  Primary Concept: Boolean conversion edge cases and safe NaN checks
*/

// Falsy values
console.log(Boolean(""));
console.log(Boolean(0));
console.log(Boolean(false));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));

// Truthy examples
console.log(Boolean(" ")); // non-empty string
console.log(Boolean("false"));
console.log(Boolean("0"));
console.log(Boolean(-1));

// NaN comparison behavior
console.log(NaN == NaN); // false
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("text")); // false (safer than global isNaN)
console.log(isNaN("text")); // true (global isNaN coerces first)
