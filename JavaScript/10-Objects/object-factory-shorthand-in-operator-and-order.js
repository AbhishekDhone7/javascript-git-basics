/*
  Topic: Object Factory Functions, in Operator, and Key Order
  Difficulty: Intermediate
  Primary Concept: Property shorthand, existence checks, and key-order behavior
*/

function createUser(name, age) {
  return {
    name,
    age,
    role: "student"
  };
}

const generatedUser = createUser("Abhishek", 30);
console.log("Generated user:", generatedUser);

const testIn = {
  firstName: "Abhishek",
  noProperty: undefined
};

console.log("Missing property direct access:", testIn.nothing); // undefined
console.log("Existing property with undefined value:", testIn.noProperty); // undefined
console.log("'noProperty' in testIn:", "noProperty" in testIn); // true
console.log("'nothing' in testIn:", "nothing" in testIn); // false

// Key-order behavior: integer-like keys are listed first in ascending order.
const mixedKeyObject = {
  b: "bee",
  3: "three",
  1: "one",
  a: "aye",
  2: "two"
};

console.log("Object key order:", Object.keys(mixedKeyObject));

// __proto__ note:
// Avoid assigning non-object values to __proto__.
// Prefer Object.create() when you need prototype control.
