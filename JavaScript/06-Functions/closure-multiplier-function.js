/*
  Topic: Closure with Returned Function (Multiplier)
  Difficulty: Intermediate
  Primary Concept: A returned function keeps access to parent variables
*/

function outerFunction(outerParam) {
  console.log("Outer param:", outerParam);

  function innerFunction(innerParam) {
    console.log("Inner param:", innerParam);
  }

  innerFunction("Nested Param");
}

outerFunction("Outer Argument");

// Returning a value from a nested function.
function outerFunctionWithReturn(outerParam) {
  function innerFunctionWithReturn(innerParam) {
    const fullName = outerParam + " " + innerParam;
    return fullName;
  }

  return innerFunctionWithReturn("Dhone");
}

const customerName = outerFunctionWithReturn("Abhishek");
console.log("Nested return result:", customerName);

// Closure remembers outer scope even after outer function returns.
function outerFunctionWithClosure() {
  const outerVariable = "I am outside!";

  function innerFunctionWithClosure() {
    console.log("Closure remembers:", outerVariable);
  }

  return innerFunctionWithClosure;
}

const rememberedFunction = outerFunctionWithClosure();
rememberedFunction();

// Real-world style closure: private state with methods.
function createCounter() {
  let count = 0;

  return {
    increment: function increment() {
      count++;
      console.log("Counter increment:", count);
    },
    decrement: function decrement() {
      count--;
      console.log("Counter decrement:", count);
    },
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
counter.decrement();

// Each returned function has its own independent closure state.
function createIncrementer() {
  let counterValue = 0;
  return function incrementOnce() {
    counterValue++;
    console.log("Incrementer state:", counterValue);
  };
}

const incrementerA = createIncrementer();
incrementerA();
incrementerA();

const incrementerB = createIncrementer();
incrementerB();

function createMultiplier() {
  let multiplierState = 9;

  return function multiplyWithState(value) {
    multiplierState = multiplierState * value;
    return multiplierState;
  };
}

const multiply = createMultiplier();
console.log(multiply(4)); // 36
console.log(multiply(2)); // 72

// Same closure idea using a function expression.
const createMultiplierExpression = function () {
  let multiplierState = 9;

  return function multiplyWithState(value) {
    multiplierState = multiplierState * value;
    return multiplierState;
  };
};

const multiplyFromExpression = createMultiplierExpression();
console.log(multiplyFromExpression(4)); // 36
console.log(multiplyFromExpression(3)); // 108

// Parent function variable is not directly accessible outside.
// console.log(multiplierState); // ReferenceError
