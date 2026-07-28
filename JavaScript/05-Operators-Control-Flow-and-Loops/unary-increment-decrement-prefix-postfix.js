/*
  Topic: Unary Increment and Decrement (Prefix vs Postfix)
  Difficulty: Beginner
  Primary Concept: Behavioral difference between x++, ++x, x--, and --x
*/

// Unary increment/decrement operators work on numeric values.
let value = 1;

value++; // Postfix increment
++value; // Prefix increment
console.log("Value after value++ and ++value:", value); // 3

let number = 0;
console.log("Postfix output 1 (number++):", number++); // prints old value: 0
console.log("Postfix output 2 (number++):", number++); // prints old value: 1

let numberForPrefix = 0;
console.log("Prefix output (++numberForPrefix):", ++numberForPrefix); // prints new value: 1

value--;
console.log("After value--:", value);

--value;
console.log("After --value:", value);

// Postfix assignment behavior
const postIncrementCapturedValue = value++;
console.log("b from value++:", postIncrementCapturedValue);
console.log("value after postfix assignment:", value);

// Prefix assignment behavior
const preIncrementCapturedValue = ++value;
console.log("c from ++value:", preIncrementCapturedValue);
console.log("value after prefix assignment:", value);

// Compound assignment
let doubled = preIncrementCapturedValue * 2;
doubled *= 2;
console.log("Doubled value after *= 2:", doubled);
