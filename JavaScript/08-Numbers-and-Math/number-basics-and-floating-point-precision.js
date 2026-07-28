/*
  Topic: Number Basics and Floating-Point Precision
  Difficulty: Beginner
  Primary Concept: JavaScript number representation and precision behavior
*/

// JavaScript uses one numeric type: Number (IEEE-754 double precision).
const decimalNumber = 3.14;
const wholeNumber = 3;
console.log("Example 1:", decimalNumber, wholeNumber);

// Scientific notation
const largeScientific = 123e5;   // 12300000
const smallScientific = 123e-5;  // 0.00123
console.log("Example 2:", largeScientific, smallScientific);
console.log("Scientific small literal:", 1e-5);

// Safe integer precision limit
const safePrecisionValue = 999999999999999;
const unsafePrecisionValue = 9999999999999999;
console.log("Example 3:", safePrecisionValue, unsafePrecisionValue);

// Floating-point precision issue
const impreciseSum = 0.2 + 0.1;
console.log("Example 4 (imprecise):", impreciseSum);

// Common workaround: scale before adding
const correctedSum = (0.2 * 10 + 0.1 * 10) / 10;
console.log("Example 5 (scaled):", correctedSum);

// Display-friendly formatting
console.log("toFixed(1):", (0.1 + 0.2).toFixed(1)); // "0.3"
console.log("toFixed(2):", (0.1 + 0.2).toFixed(2)); // "0.30"
