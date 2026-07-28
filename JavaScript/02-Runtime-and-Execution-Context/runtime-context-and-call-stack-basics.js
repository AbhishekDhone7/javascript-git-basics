/*
  Topic: Runtime context and call stack basics
  Difficulty: Beginner
  Primary Concept: How execution contexts are created, stacked, and removed
*/

console.log("--- Runtime context basics ---");

function first() {
  console.log("first start");
  second();
  console.log("first end");
}

function second() {
  console.log("second start");
  third();
  console.log("second end");
}

function third() {
  console.log("third running on top of the call stack");
}

first();

console.log("--- Execution order note ---");
function countdown(number) {
  if (number === 0) {
    console.log("done");
    return;
  }

  console.log(number);
  countdown(number - 1);
}

countdown(3);

console.log("--- Notes ---");
console.log("Global code runs first, then each function gets its own execution context.");
console.log("The call stack is last-in, first-out.");
