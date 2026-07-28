/*
  Topic: Callbacks and Higher-Order Functions
  Difficulty: Beginner to Intermediate
  Primary Concept: Passing functions as arguments and invoking them safely
*/

function marotiGarland(flower) {
  return "Garland by Maroti made of " + flower;
}

function tusharGarland(flower) {
  return "Garland by Tushar made of " + flower;
}

function vinayFlowers(callback, flower) {
  return callback(flower);
}

const garlandByMaroti = vinayFlowers(marotiGarland, "Roses");
const garlandByTushar = vinayFlowers(tusharGarland, "Marigold");
console.log(garlandByMaroti);
console.log(garlandByTushar);

// Basic callback
function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

function farewell() {
  console.log("Goodbye!");
}

greet("John", farewell);

// Callback with operation + result handler
function calculate(x, y, operation, callback) {
  const result = operation(x, y);
  callback(result);
}

function addition(a, b) {
  return a + b;
}

function displayResult(value) {
  console.log("Result:", value);
}

calculate(5, 3, addition, displayResult);

// Multiple callbacks for different behaviors
function performOperation(a, b, operationCallback) {
  const result = operationCallback(a, b);
  console.log("Operation result:", result);
}

function addCallback(x, y) {
  return x + y;
}

function multiplyCallback(x, y) {
  return x * y;
}

performOperation(3, 4, addCallback);
performOperation(5, 6, multiplyCallback);

// Asynchronous callback example
function fetchData(callback) {
  setTimeout(function () {
    const data = "Async Data";
    callback(data);
  }, 50);
}

fetchData(function (result) {
  console.log("Fetched data:", result);
});

// Callback chaining style (often called callback hell)
function step1(callback) {
  setTimeout(function () {
    console.log("Step 1 complete");
    callback();
  }, 20);
}

function step2(callback) {
  setTimeout(function () {
    console.log("Step 2 complete");
    callback();
  }, 20);
}

function step3(callback) {
  setTimeout(function () {
    console.log("Step 3 complete");
    callback();
  }, 20);
}

step1(function () {
  step2(function () {
    step3(function () {
      console.log("All steps completed");
    });
  });
});

// Higher-order function returning a function that expects a callback.
function multiplier(factor) {
  return function (number, callback) {
    const result = number * factor;
    callback(result);
  };
}

const double = multiplier(2);
double(7, displayResult);
