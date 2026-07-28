/*
  Topic: Rounding Methods and Decimal Precision
  Difficulty: Beginner
  Primary Concept: Rounding values with Math methods and toFixed
*/

// Core rounding methods
console.log("Math.floor(3.1):", Math.floor(3.1));
console.log("Math.floor(-1.1):", Math.floor(-1.1));

console.log("Math.ceil(3.1):", Math.ceil(3.1));
console.log("Math.ceil(-1.1):", Math.ceil(-1.1));

console.log("Math.round(3.1):", Math.round(3.1));
console.log("Math.round(3.6):", Math.round(3.6));
console.log("Math.round(3.5):", Math.round(3.5));

console.log("Math.trunc(3.1):", Math.trunc(3.1));
console.log("Math.trunc(-1.1):", Math.trunc(-1.1));

// Rounding to nth decimal using multiply and divide
const num1 = 1.23456;
const roundedNum1 = Math.round(num1 * 100) / 100;
console.log("Example 1:", roundedNum1); // 1.23

// toFixed(n) returns a string
const num2 = 12.34;
const roundedNum2 = num2.toFixed(1);
console.log("Example 2:", roundedNum2, "| type:", typeof roundedNum2); // "12.3"

const num3 = 12.36;
const roundedNum3 = num3.toFixed(1);
console.log("Example 3:", roundedNum3); // "12.4"

// Convert toFixed result to number if numeric type is needed
const num4 = 12.34;
const roundedNum4 = +num4.toFixed(5);
console.log("Example 4:", roundedNum4, "| type:", typeof roundedNum4); // 12.34
