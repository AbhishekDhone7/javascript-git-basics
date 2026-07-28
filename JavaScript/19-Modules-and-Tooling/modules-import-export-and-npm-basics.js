/*
  Topic: Modules and tooling basics
  Difficulty: Beginner
  Primary Concept: Splitting code into modules and managing project tooling
*/

console.log("--- Modules and tooling basics ---");

function add(left, right) {
  return left + right;
}

function multiply(left, right) {
  return left * right;
}

const mathToolkit = { add, multiply };

console.log("CommonJS-style module object:", mathToolkit);
console.log("add:", mathToolkit.add(2, 3));
console.log("multiply:", mathToolkit.multiply(2, 4));

const toolingChecklist = [
  "Use package.json for scripts and dependencies",
  "Use npm install to add packages",
  "Use linting to catch style and safety issues early",
  "Use bundlers only when the project actually needs them",
];

toolingChecklist.forEach((item) => console.log(item));

console.log("--- Notes ---");
console.log("Modules keep files focused. Tooling automates builds, checks, and publishing steps.");
