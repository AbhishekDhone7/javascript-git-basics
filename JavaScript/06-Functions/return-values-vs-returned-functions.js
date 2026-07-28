/*
  Topic: Returning a Value vs Returning a Function
  Difficulty: Intermediate
  Primary Concept: Difference between immediate computation and deferred execution
*/

function calculateWithCallback(logic, a, b) {
  return logic(a, b);
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

function returnFunction(logic, a, b) {
  return function deferredExecution() {
    return logic(a, b);
  };
}

const deferred = returnFunction(sum, 10, 5);
console.log(deferred); // function reference
console.log(deferred()); // 15
console.log(returnFunction(sum, 10, 5)()); // 15

function returnStatementExample(a, b, c) {
  return a + b + c === 15 ? a + b + c : "Not 15";
}

console.log(returnStatementExample(5, 5, 5));
