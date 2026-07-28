/*
  Topic: Closure with Returned Function (Multiplier)
  Difficulty: Intermediate
  Primary Concept: A returned function keeps access to parent variables
*/

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

// Parent function variable is not directly accessible outside.
// console.log(multiplierState); // ReferenceError
