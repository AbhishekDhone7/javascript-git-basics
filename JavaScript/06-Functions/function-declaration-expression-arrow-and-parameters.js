/*
  Topic: Function Declaration, Expression, Arrow, and Parameters
  Difficulty: Beginner
  Primary Concept: Function forms, invocation, parameters, and return behavior
*/

// 1) Function declaration
function greetByDeclaration(name) {
  console.log("Hello, " + name + "!");
}

// 2) Function expression (anonymous function assigned to variable)
const subtractByExpression = function (a, b) {
  return a - b;
};

// 3) Arrow function
const multiplyByArrow = (a, b) => a * b;

console.log("Result of subtraction:", subtractByExpression(8, 3));
console.log("Result of multiplication:", multiplyByArrow(4, 6));
greetByDeclaration("John");

// Parameters vs arguments + return value
function sumOfSquares(a, b) {
  const squaredA = a * a;
  const squaredB = b * b;
  return squaredA + squaredB;
}

let x = 3;
let y = 5;
console.log("sumOfSquares(3, 5):", sumOfSquares(3, 5));
console.log("sumOfSquares(x, y):", sumOfSquares(x, y));
console.log("x and y remain unchanged:", x, y); // primitives are passed by value

// Default parameter
function greetWithDefault(name = "Guest") {
  console.log("Hello, " + name + "!");
}

greetWithDefault();
greetWithDefault("Alice");

// Rest parameter collects remaining arguments into an array
function calculateCartTotal(...prices) {
  return prices.reduce((total, price) => total + price, 0);
}

function firstTwoAndRest(first, second, ...rest) {
  return {
    first,
    second,
    rest,
  };
}

console.log("Cart total:", calculateCartTotal(100, 200, 3000, 4000));
console.log("firstTwoAndRest:", firstTwoAndRest(100, 200, 3000, 4000));

// Functions as first-class citizens
function applyOperation(a, b, operation) {
  return operation(a, b);
}

console.log("applyOperation with arrow:", applyOperation(10, 5, (m, n) => m + n));

// Object and array as function arguments
const user = {
  user: "Abhi",
  price: 199,
};

function handleObject(anyObject) {
  console.log(`here is the user ${anyObject.user}, here is the price ${anyObject.price}`);
}

const myArray = [10, 20, 30, 40];

function handleArray(anyArray) {
  console.log("Array values:", anyArray[0], anyArray[1], anyArray[2], anyArray[3]);
}

handleObject(user);
handleArray(myArray);
