/*
  Topic: Testing and quality basics
  Difficulty: Beginner
  Primary Concept: Writing assertions and simple quality checks
*/

console.log("--- Testing and quality basics ---");

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message} | expected ${expected}, got ${actual}`);
  }
}

function sum(left, right) {
  return left + right;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

assertEqual(sum(2, 3), 5, "sum should add numbers");
assertEqual(clamp(12, 0, 10), 10, "clamp should limit upper bound");
assertEqual(clamp(-1, 0, 10), 0, "clamp should limit lower bound");

console.log("All basic assertions passed.");
console.log("Quality checklist: readable names, small functions, safe defaults, and repeatable tests.");
