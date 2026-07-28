/*
  Topic: Arithmetic Operators, Precedence, and Associativity
  Difficulty: Beginner
  Primary Concept: Using mathematical operators and understanding evaluation order
*/

// Addition (+)
const sum = 5 + 3;
console.log("Addition Result:", sum); // 8

// Subtraction (-)
const difference = 10 - 4;
console.log("Subtraction Result:", difference); // 6

// Multiplication (*)
const product = 7 * 2;
console.log("Multiplication Result:", product); // 14

// Division (/)
const quotient = 20 / 5;
console.log("Division Result:", quotient); // 4

// Modulus (%)
const remainder = 17 % 3;
console.log("Modulus Result:", remainder); // 2

// Increment and decrement
let counter = 5;
counter++;
console.log("Increment Result:", counter); // 6
counter--;
console.log("Decrement Result:", counter); // 5

// Exponentiation (**)
const powerResult = 2 ** 3;
console.log("Exponentiation Result:", powerResult); // 8

// Right-to-left associativity for exponentiation
const resultRightToLeft = 2 ** 3 ** 2; // 2 ** (3 ** 2)
console.log("Right-to-Left Result:", resultRightToLeft); // 512

// Left-to-right associativity for multiplication and division
const resultLeftToRight = 2 * 3 / 2; // (2 * 3) / 2
console.log("Left-to-Right Result:", resultLeftToRight); // 3

// Operator precedence examples
const precedenceExample1 = 2 + 3 * 4;
console.log("Precedence Example 1:", precedenceExample1); // 14

const precedenceExample2 = (2 + 3) * 4;
console.log("Precedence Example 2:", precedenceExample2); // 20

const precedenceExample3 = 2 * (3 % 2);
console.log("Precedence Example 3:", precedenceExample3); // 2
