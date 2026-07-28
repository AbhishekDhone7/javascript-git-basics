/*
  Topic: Returning a Value vs Returning a Function
  Difficulty: Intermediate
  Primary Concept: Difference between immediate computation and deferred execution
*/

// return ends function execution immediately.
function earlyReturnExample() {
  console.log("This function returns after conditional check");
  let firstValue = 2;
  let secondValue = 20;
  firstValue = firstValue * firstValue;
  secondValue = secondValue * secondValue;

  if (firstValue > 10) {
    return firstValue;
  }

  const totalValue = firstValue + secondValue;
  return totalValue;
}

console.log("Early return result:", earlyReturnExample());

function calculateWithCallback(logic, firstOperand, secondOperand) {
  return logic(firstOperand, secondOperand);
}

function sum(x, y) {
  return x + y;
}

const computedValue = calculateWithCallback(sum, 10, 5);
console.log(computedValue); // 15

// This value is not a function. Demonstrate safely with try/catch.
try {
  console.log(computedValue());
} catch (error) {
  console.log("Calling a number as function error:", error.name);
}

function returnFunction(logic, firstOperand, secondOperand) {
  return function deferredExecution() {
    return logic(firstOperand, secondOperand);
  };
}

const deferred = returnFunction(sum, 10, 5);
console.log(deferred); // function reference
console.log(deferred()); // 15
console.log(returnFunction(sum, 10, 5)()); // 15

// Returning a function declaration (closure) with captured parent value.
function greetMe(name) {
  const greeting = "Hello, " + name + "!";
  return function finalGreeting() {
    console.log("This is the final greeting:", greeting);
  };
}

const returnedFunction = greetMe("Abhishek");
console.log(returnedFunction);
returnedFunction();
greetMe("Abhishek")();

// Returning plain values/containers on the right side of return.
function getPerson() {
  const person = {
    name: "Alice",
    age: 30,
    city: "Wonderland",
  };
  return person;
}

const alice = getPerson();
console.log(alice.name, alice.age, alice.city);

function returnStatementExample(firstValue, secondValue, thirdValue) {
  return firstValue + secondValue + thirdValue === 15
    ? firstValue + secondValue + thirdValue
    : "Not 15";
}

console.log(returnStatementExample(5, 5, 5));
