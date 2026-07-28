/*
  Topic: for...in vs for...of Iteration Patterns
  Difficulty: Beginner
  Primary Concept: Choosing the correct loop for arrays, objects, strings, and nested data
*/

// Example 1: for...in with arrays (returns indices)
const colorsArray = ["red", "green", "blue"];
console.log("Using for...in with arrays:");
for (const index in colorsArray) {
  console.log(index, "(type:", typeof index + ")"); // "0", "1", "2"
  console.log(colorsArray[index]);
}
console.log("------------------------");

// Example 2: for...of with arrays (returns values)
console.log("Using for...of with arrays:");
for (const color of colorsArray) {
  console.log(color); // red, green, blue
}
console.log("------------------------");

// Example 3: for...in with objects (returns keys)
const personObject = {
  name: "John",
  age: 30,
  city: "New York"
};

console.log("Using for...in with objects:");
for (const key in personObject) {
  if (Object.hasOwn(personObject, key)) {
    console.log(`${key}: ${personObject[key]}`);
  }
}
console.log("------------------------");

// Example 3B: Why own-property checks matter with inherited properties
const personWithPrototype = Object.create({ country: "USA" });
personWithPrototype.name = "John";
personWithPrototype.age = 30;

console.log("for...in without own-property check includes inherited keys:");
for (const key in personWithPrototype) {
  console.log(`${key}: ${personWithPrototype[key]}`);
}

console.log("for...in with own-property check excludes inherited keys:");
for (const key in personWithPrototype) {
  if (Object.hasOwn(personWithPrototype, key)) {
    console.log(`${key}: ${personWithPrototype[key]}`);
  }
}
console.log("------------------------");

// Example 4: for...of with strings (returns characters)
const messageString = "Hello";
console.log("Using for...of with strings:");
for (const char of messageString) {
  console.log(char);
}
console.log("------------------------");

// Example 5: nested arrays using for...of for inner values
const nestedColorsArray = [
  ["red", "green", "blue"],
  ["yellow", "purple", "orange"]
];

console.log("Using for...in + for...of with nested arrays:");
for (const outerIndex in nestedColorsArray) {
  for (const color of nestedColorsArray[outerIndex]) {
    console.log(color);
  }
}
console.log("------------------------");

// Same nested array using only for...of
console.log("Using for...of with nested arrays:");
for (const colorGroup of nestedColorsArray) {
  for (const color of colorGroup) {
    console.log(color);
  }
}
console.log("------------------------");

// Example 6: nested objects with Object.values + for...of
const nestedPersonObject = {
  person1: { name: "John", age: 30 },
  person2: { name: "Alice", age: 25 }
};

console.log("Object.entries output:", Object.entries(nestedPersonObject));
console.log("Object.values output:", Object.values(nestedPersonObject));

console.log("Using for...of with nested object values:");
for (const person of Object.values(nestedPersonObject)) {
  console.log(person.name);
}
console.log("------------------------");

// Example 7: nested objects with for...in
console.log("Using for...in with nested objects:");
for (const key in nestedPersonObject) {
  console.log(`${key}: ${nestedPersonObject[key].name}`);
}
console.log("------------------------");

// Quick reminder
console.log("for...in on [1,2,3,4,5] gives indices:");
for (const index in [1, 2, 3, 4, 5]) {
  console.log(index);
}

console.log("Rule of thumb: for...in for object keys, for...of for iterable values.");
