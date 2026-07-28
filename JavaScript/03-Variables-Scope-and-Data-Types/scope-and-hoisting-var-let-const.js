/*
  Topic: Scope and Hoisting with var, let, and const
  Difficulty: Beginner
  Primary Concept: Scope rules and hoisting differences
*/

// Global scope example
var globalMessage = "I am a global variable";

function showVarScope() {
  // var is function-scoped
  var localMessage = "I am a local variable";

  console.log(globalMessage); // Accessible
  console.log(localMessage); // Accessible
}

showVarScope();

// Accessing function-scoped variable outside its function causes ReferenceError
try {
  console.log(localMessage);
} catch (error) {
  console.log("Outside function access error:", error.name);
}

function showLetBlockScope() {
  // let is block-scoped and can be reassigned in the same scope
  let watchmanName = "I am watchman";
  watchmanName = "Please call me Ravi watchman";

  console.log(watchmanName);

  if (true) {
    let watchmanName = "I am brother";
    console.log(watchmanName); // Inner block variable
  }

  // Still refers to outer function-scope let variable
  console.log(watchmanName);
}

showLetBlockScope();

// const cannot be reassigned
const pi = 3.14;
console.log("Pi value:", pi);

// Hoisting with var: declaration is hoisted, value is undefined until assignment
console.log("Hoisted var before assignment:", hoistedVar);
var hoistedVar = "I am hoisted";
console.log("Hoisted var after assignment:", hoistedVar);

// Hoisting with let and const: they are in Temporal Dead Zone before declaration
try {
  console.log(hoistedLet);
} catch (error) {
  console.log("Hoisted let access error:", error.name);
}

let hoistedLet = "I am block-scoped";
console.log("let after declaration:", hoistedLet);

try {
  console.log(hoistedConst);
} catch (error) {
  console.log("Hoisted const access error:", error.name);
}

const hoistedConst = "I am const";
console.log("const after declaration:", hoistedConst);

// Function declarations are hoisted with their bodies.
sayHelloBeforeDeclaration();

function sayHelloBeforeDeclaration() {
  sayByeInside();
  console.log("Hello, John!");

  function sayByeInside() {
    console.log("Bye John");
  }
}

// Function expressions are not callable before assignment.
try {
  sayHiBeforeAssignment();
} catch (error) {
  console.log("Function expression before assignment error:", error.name);
}

var sayHiBeforeAssignment = function () {
  console.log("Hi!");
};

sayHiBeforeAssignment();

// let/const function expressions are in TDZ before declaration.
try {
  constSayByeBeforeDeclaration();
} catch (error) {
  console.log("const function expression TDZ error:", error.name);
}

const constSayByeBeforeDeclaration = function () {
  console.log("Bye Bye");
};

constSayByeBeforeDeclaration();

// Hoisting inside functions
function exampleFunctionHoisting() {
  console.log("name before var assignment:", nameInside); // undefined
  var nameInside = "Alice";
  console.log("name after var assignment:", nameInside); // Alice
}

exampleFunctionHoisting();

// Nested scope behavior with hoisting and lexical access
function outerFunction() {
  var outerVariable = "I'm in the outer function!";

  function innerFunction() {
    console.log("Inner can read outer variable:", outerVariable);
    console.log("innerVariable before assignment:", innerVariable); // undefined
    var innerVariable = "I'm in the inner function!";
    console.log("innerVariable after assignment:", innerVariable);
  }

  innerFunction();

  try {
    console.log(innerVariable);
  } catch (error) {
    console.log("Outer cannot read inner function var:", error.name);
  }
}

outerFunction();

// TDZ comparison: let is in TDZ before declaration, var is initialized as undefined.
try {
  console.log(letValueBeforeDeclaration);
} catch (error) {
  console.log("let TDZ before declaration error:", error.name);
}

let letValueBeforeDeclaration = "I am the let variable";
console.log("let after declaration:", letValueBeforeDeclaration);

console.log("var before declaration:", varValueBeforeDeclaration); // undefined
var varValueBeforeDeclaration;
console.log("var after declaration:", varValueBeforeDeclaration); // undefined
varValueBeforeDeclaration = "I am the var variable";
console.log("var after assignment:", varValueBeforeDeclaration);
