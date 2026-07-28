/*
  Topic: Equality and Comparison Coercion
  Difficulty: Beginner
  Primary Concept: Difference between loose and strict checks, and comparison coercion
*/

// Loose equality performs coercion
const looseEquality = "5" == 5;

// Strict equality checks type and value
const strictEquality = "5" === 5;

console.log(looseEquality, strictEquality); // true false

const looseInequality = "5" != 5;
const strictInequality = "5" !== 5;
console.log(looseInequality, strictInequality); // false true

// Comparison operators coerce numeric-looking strings to numbers
const greaterThan = "10" > 5;
const lessThanOrEqual = "5" <= 5;
console.log(greaterThan, lessThanOrEqual); // true true

// + with string concatenates, while - tries numeric conversion
const addAsString = "5" + 3;
const subtractAsNumber = "9" - 3;
console.log(addAsString, subtractAsNumber); // 53 6

// Logical operators return one of the operands (not always true/false)
const andOperator = "text" && true; // true
const orOperator = "" || false; // false
console.log(andOperator, orOperator);
