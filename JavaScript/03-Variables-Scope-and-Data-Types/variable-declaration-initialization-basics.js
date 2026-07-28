/*
  Topic: Variable Declaration and Initialization Basics
  Difficulty: Beginner
  Primary Concept: Declaring variables, assigning values, and using arithmetic output
*/

// Declaration (variable is created, value is undefined initially).
let firstNumber;

// Initialization (first value assignment).
firstNumber = 5;

// Declaration and initialization at the same time.
const secondNumber = 10;

// Store calculation result.
const sum = firstNumber + secondNumber;

// Different output styles.
console.log(firstNumber + secondNumber); // 15
console.log("Addition is:", sum);
console.log("Addition is: " + sum);

// Traditional string concatenation.
console.log("Addition of " + firstNumber + " and " + secondNumber + " is " + sum);

// Template literal output (modern style).
console.log(`Addition of ${firstNumber} and ${secondNumber} is ${sum}`);
