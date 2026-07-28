/*
  Topic: JavaScript Identifier Naming and Case Sensitivity
  Difficulty: Beginner
  Primary Concept: Naming rules for variables and case-sensitive identifiers
*/

// Keywords are reserved and cannot be used as variable names.
// Example (invalid): let let = 10;

// Valid variable declarations using let, const, and var.
let firstValue = 15;
let secondValue = 20;
secondValue = firstValue + secondValue; // Reassignment with let is allowed

const piValue = 3.14; // const cannot be reassigned
var firstVariable = "one";
let firstvariable = "two";

// JavaScript is case-sensitive: firstVariable and firstvariable are different names.
console.log(firstVariable);
console.log(firstvariable);

// Additional output for clarity.
console.log("secondValue after reassignment:", secondValue);
console.log("PI:", piValue);

// Identifier naming notes:
// Allowed: letters, digits (not as first character), underscore (_), dollar sign ($)
// Examples: userName, _total, $price, value2
// Not allowed: names starting with digits, spaces, or special symbols like - + !
