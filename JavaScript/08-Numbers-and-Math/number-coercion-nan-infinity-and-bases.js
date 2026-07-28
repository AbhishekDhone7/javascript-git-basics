/*
  Topic: Number Coercion, NaN, Infinity, and Numeric Bases
  Difficulty: Beginner
  Primary Concept: Number-string behavior and special numeric values
*/

// Addition vs concatenation
const numericAddition = 10 + 20;
const stringConcat = "10" + "20";
const mixedConcat1 = 10 + "20";
const mixedConcat2 = "10" + 20;
console.log("Example 6:", numericAddition, stringConcat, mixedConcat1, mixedConcat2);

// Common expression-order behavior
const expressionOrder1 = "The result is: " + 10 + 20; // "The result is: 1020"
const expressionOrder2 = 10 + 20 + "30"; // "3030"
console.log("Example 7:", expressionOrder1, expressionOrder2);

// Numeric strings with arithmetic operators
const numericString = "100";
const divisionResult = numericString / "10";
console.log("Example 8:", divisionResult);

// NaN behavior
const nanResult = 100 / "Apple";
console.log("Example 9:", nanResult, Number.isNaN(nanResult));

const nanArithmetic = Number.NaN + 5;
console.log("Example 10:", nanArithmetic);

// Infinity
const infinityResult = 2 / 0;
console.log("Example 11:", infinityResult);
console.log("Example 12 (typeof Infinity):", typeof Infinity);

// Hexadecimal
const hexNumber = 0xff;
console.log("Example 13:", hexNumber);

// Base conversion
const myNumber = 32;
console.log(
  "Example 14:",
  myNumber.toString(32),
  myNumber.toString(16),
  myNumber.toString(10),
  myNumber.toString(8),
  myNumber.toString(2)
);

const smallNumber = 8;
console.log("Binary for 8:", smallNumber.toString(2));

// Number primitives vs Number objects
const numberPrimitive = 123;
const numberObject = new Number(123);
console.log("Example 15:", numberPrimitive, numberObject);
