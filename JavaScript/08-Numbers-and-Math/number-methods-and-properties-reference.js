/*
  Topic: Number Methods and Properties Reference
  Difficulty: Intermediate
  Primary Concept: Practical Number API checks, formatting, and constants
*/

// Number checks
console.log("Number.isFinite(42):", Number.isFinite(42));
console.log("Number.isFinite(Infinity):", Number.isFinite(Infinity));

console.log("Number.isInteger(42):", Number.isInteger(42));
console.log("Number.isInteger(42.5):", Number.isInteger(42.5));

console.log("Number.isNaN(NaN):", Number.isNaN(NaN));
console.log("Number.isNaN('NaN'):", Number.isNaN("NaN"));

console.log("Number.isSafeInteger(42):", Number.isSafeInteger(42));
console.log("Number.isSafeInteger(2 ** 53):", Number.isSafeInteger(2 ** 53));

// Parsing
console.log("Number.parseFloat('3.14'):", Number.parseFloat("3.14"));
console.log("Number.parseInt('42.5'):", Number.parseInt("42.5", 10));

// Formatting
console.log("(42).toExponential(2):", (42).toExponential(2));
console.log("(42.5678).toFixed(2):", (42.5678).toFixed(2));
console.log("(1234567.89).toLocaleString():", (1234567.89).toLocaleString());
console.log("(42.5678).toPrecision(4):", (42.5678).toPrecision(4));
console.log("(42).toString():", (42).toString());
console.log("(42.333).valueOf():", (42.333).valueOf());

// Number constants
console.log("Number.EPSILON:", Number.EPSILON);
console.log("Number.MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
console.log("Number.MIN_SAFE_INTEGER:", Number.MIN_SAFE_INTEGER);
console.log("Number.MAX_VALUE:", Number.MAX_VALUE);
console.log("Number.MIN_VALUE:", Number.MIN_VALUE);
console.log("Number.NaN:", Number.NaN);
console.log("Number.NEGATIVE_INFINITY:", Number.NEGATIVE_INFINITY);
console.log("Number.POSITIVE_INFINITY:", Number.POSITIVE_INFINITY);
