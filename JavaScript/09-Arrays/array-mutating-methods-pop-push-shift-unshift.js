/*
  Topic: Array Mutating Methods (pop, push, shift, unshift)
  Difficulty: Beginner
  Primary Concept: How basic mutating methods change array state
*/

const fruitsForMethods = ["Apple", "Orange", "Pear"];

// at(-1) gets the last element without changing the array.
const lastElement = fruitsForMethods.at(-1);
console.log("Last element with at(-1):", lastElement);
console.log("Before mutation:", fruitsForMethods);

// pop removes and returns the last element.
const poppedElement = fruitsForMethods.pop();
console.log("Popped element:", poppedElement);
console.log("After pop:", fruitsForMethods);

// push appends one or more elements and returns new length.
const newLengthAfterPush = fruitsForMethods.push("Peach");
console.log("New length after push:", newLengthAfterPush);
console.log("After push:", fruitsForMethods);

// shift removes and returns the first element.
const shiftedElement = fruitsForMethods.shift();
console.log("Shifted element:", shiftedElement);
console.log("After shift:", fruitsForMethods);

// unshift adds one or more elements at the beginning and returns new length.
const newLengthAfterUnshift = fruitsForMethods.unshift("Banana");
console.log("New length after unshift:", newLengthAfterUnshift);
console.log("After unshift:", fruitsForMethods);

// Add multiple elements at once.
fruitsForMethods.push("Cherry", "Grapes");
fruitsForMethods.unshift("Mango", "Kiwi");
console.log("After multiple push and unshift:", fruitsForMethods);
