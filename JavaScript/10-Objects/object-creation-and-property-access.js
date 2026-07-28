/*
  Topic: Object Creation and Property Access
  Difficulty: Beginner
  Primary Concept: Creating objects and accessing properties with dot and bracket notation
*/

const basicObject = {
  property1: "Value1",
  property2: "value2",
  one: 1,
  truthyValue: true
};

const dynamicKey = "property1";

console.log("Full object:", basicObject);
console.log("Dot notation:", basicObject.property1);
console.log("Bracket with string:", basicObject["property1"]);
console.log("Bracket with variable:", basicObject[dynamicKey]);
console.log("Missing property with dot:", basicObject.dynamicKey); // undefined

// Property names are strings internally.
const keyAsNumber = {
  10: "ten"
};
console.log("Numeric key access as string:", keyAsNumber["10"]);
