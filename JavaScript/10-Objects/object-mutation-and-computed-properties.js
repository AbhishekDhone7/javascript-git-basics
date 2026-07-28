/*
  Topic: Object Mutation and Computed Properties
  Difficulty: Beginner
  Primary Concept: Adding/deleting properties and creating computed keys
*/

const person = {
  firstName: "Abhishek",
  lastName: "Dhone"
};

// Add properties
person.favoriteColor = "Blue";
person.workplace = "Google";
console.log("After adding properties:", person);

// Delete properties
delete person.favoriteColor;
delete person.lastName;
console.log("After deleting properties:", person);

// Reserved words and spaces can be used in property names.
const user = {
  name: "John",
  age: 30,
  let: "Allowed as property name",
  for: "Also allowed",
  "likes birds": true
};

console.log("Reserved-word property:", user.let);
console.log("Another reserved-word property:", user.for);
console.log("Space-containing key:", user["likes birds"]);

// Computed property
const fruit = "apple";
const fruitInventory = {
  [fruit]: 5
};

console.log("Computed property value:", fruitInventory.apple);
console.log("Computed property value by variable:", fruitInventory[fruit]);
