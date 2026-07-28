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
