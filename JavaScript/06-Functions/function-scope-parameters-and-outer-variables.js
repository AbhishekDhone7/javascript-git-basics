/*
  Topic: Function Scope, Parameters, and Outer Variables
  Difficulty: Beginner
  Primary Concept: Local scope, outer variable access, and parameter copy behavior
*/

// Function declaration, initialization, and call
let outerSum;
let globalSum;

function addition() {
  const firstOperand = 2;
  const secondOperand = 3;
  const localSum = firstOperand + secondOperand;

  // Safe explicit global assignment for demonstration.
  globalSum = firstOperand + secondOperand + localSum;
  outerSum = firstOperand + secondOperand;

  return localSum;
}

addition();
const result = addition();
console.log("The result of addition is:", result);
console.log("The result of addition is:", addition());

// console.log(c); // ReferenceError (c is function-scoped)
console.log("Inside global sum:", globalSum);
console.log("Outer sum:", outerSum);

function showMessage() {
  const localMessage = "Hello, I am Abhishek Dhone";
  console.log(localMessage);
}

showMessage();
// console.log(localMessage); // ReferenceError

let userName = "Abhishek";
let attributeOriginal = "AttriORIGINAL";
let globalMessage = "";

function showMessageWithOuterVariables(attributeValue) {
  const greeting = "Hello, " + userName;
  globalMessage =
    "Hi I am Global, " + userName + " --- Set inside function, read outside";

  userName = "Arjun"; // modifies outer variable

  console.log(greeting);
  console.log("Inside function before update:", attributeValue);

  attributeValue = "Attri1 inside function";
  console.log("Inside function after update:", attributeValue);

  return attributeValue;
}

const modifiedAttribute = showMessageWithOuterVariables(attributeOriginal);

console.log("Outside function original value:", attributeOriginal);
console.log("Returned modified value:", modifiedAttribute);
console.log(globalMessage);
console.log("Outer variable changed to:", userName);

// Primitive values are passed by value (copy).
function passByValue(value) {
  console.log("Inside passByValue - original:", value);
  value = 20;
  console.log("Inside passByValue - modified local copy:", value);
}

const primitiveNumber = 10;
console.log("Before passByValue:", primitiveNumber);
passByValue(primitiveNumber);
console.log("After passByValue (unchanged):", primitiveNumber);

// Objects/arrays: the reference is copied, so mutation affects original data.
function mutateObject(inputObject) {
  inputObject.property = "Modified Property";
}

function mutateArray(inputArray) {
  inputArray.push("New Element");
}

const userObject = { property: "Original Property" };
const numberArray = [1, 2, 3];

console.log("Before mutateObject:", userObject);
mutateObject(userObject);
console.log("After mutateObject:", userObject);

console.log("Before mutateArray:", numberArray);
mutateArray(numberArray);
console.log("After mutateArray:", numberArray);

// Important note:
// Assigning to an undeclared variable (for example: accidentalGlobal = 10)
// creates a global in non-strict mode and is a bad practice.
