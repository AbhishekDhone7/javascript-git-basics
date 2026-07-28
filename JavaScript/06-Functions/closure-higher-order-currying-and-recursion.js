/*
  Topic: Closures, Higher-Order Functions, Currying, and Recursion
  Difficulty: Intermediate
  Primary Concept: Functions that capture outer variables, accept/return functions, and solve problems recursively
*/

// Basic closure: the inner function remembers the outer variable.
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log("Outer Variable:", outerVariable);
    console.log("Inner Variable:", innerVariable);
  };
}

const newFunction = outerFunction("outside");
newFunction("inside");

// Closure for private state.
function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
      console.log("Counter increment:", count);
    },
    decrement() {
      count--;
      console.log("Counter decrement:", count);
    },
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
counter.decrement();

const anotherCounter = createCounter();
anotherCounter.decrement();

// Each closure keeps its own captured value.
function createRandomValueLogger() {
  const capturedRandomValue = Math.random();

  return function () {
    console.log("Captured random value:", capturedRandomValue);
  };
}

const randomValueLoggers = [createRandomValueLogger(), createRandomValueLogger(), createRandomValueLogger()];
randomValueLoggers[0]();
randomValueLoggers[1]();
randomValueLoggers[2]();

// Higher-order function that takes another function as an argument.
function repeatOperation(times, operation) {
  for (let index = 0; index < times; index++) {
    operation(index);
  }
}

repeatOperation(3, (index) => console.log("Repeat index:", index));

// Higher-order function that returns a function.
function createGreeting(greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const greetHello = createGreeting("Hello");
greetHello("Alice");

// Function as a first-class value.
const logMessage = () => console.log("Hello, world!");
const executeFunction = (fn) => fn();
executeFunction(logMessage);

// Generic filter helper to show a custom higher-order function.
function filterArray(array, test) {
  const filtered = [];

  for (const item of array) {
    if (test(item)) {
      filtered.push(item);
    }
  }

  return filtered;
}

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filterArray(numbers, (number) => number % 2 === 0);
console.log("Even numbers:", evenNumbers);

// Currying: converting a multi-argument function into nested single-argument functions.
function curriedAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log("Curried add:", curriedAdd(5)(4)(3));

const addFive = curriedAdd(5);
console.log("Curried add partial:", addFive(3)(2));

// Generic curry helper.
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAddGeneric = curry(add);
console.log("Generic curry:", curriedAddGeneric(5)(3)(2));

// Recursive factorial.
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));

// Recursive sum.
function recursiveSum(maxNumber) {
  if (maxNumber <= 1) {
    return maxNumber;
  }

  return maxNumber + recursiveSum(maxNumber - 1);
}

console.log("Sum of 10:", recursiveSum(10));

// Recursive Fibonacci.
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci of 6:", fibonacci(6));

// Recursive traversal of a nested object tree.
const tree = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [{ name: "grandchild1" }, { name: "grandchild2" }],
    },
    {
      name: "child2",
    },
  ],
};

function traverseTree(node) {
  console.log("Tree node:", node.name);

  if (node.children) {
    node.children.forEach((child) => traverseTree(child));
  }
}

traverseTree(tree);

// Closures are useful for encapsulating state, while recursion is useful for nested or repeated structure.
