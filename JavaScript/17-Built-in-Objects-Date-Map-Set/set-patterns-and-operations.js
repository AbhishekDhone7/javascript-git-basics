/*
  Topic: Set Patterns and Operations
  Difficulty: Beginner to Intermediate
  Primary Concept: Unique values, membership checks, iteration, and de-duplication
*/

// A Set stores unique values only.
const setNumbers = new Set([12, 21, 34, 66, 8, 8, 67, 88, 89, 39, 23, 23, 23]);
const setStrings = new Set([
  "Abhishek",
  "sagar",
  "pratik",
  "tejas",
  "nayan",
  "om",
  "om",
  "om",
]);

console.log("setNumbers:", setNumbers);
console.log("setStrings:", setStrings);

// Adding values with add(). Duplicate values are ignored.
const greetings = new Set();
greetings.add("Hola");
greetings.add("Hello");
greetings.add("Hola");
console.log("After add():", greetings);

let firstName = "Abhishek";
let lastName = "Dhone";
greetings.add(firstName);
greetings.add(lastName);
firstName = "Sagar";
greetings.add(firstName);
greetings.add("firstName");
greetings.add("lastName");
console.log("After variable and string additions:", greetings);

let changingName = "Elon";
greetings.add(changingName);
changingName = "Mark";
greetings.add(changingName);
console.log("After repeated variable updates:", greetings);

// forEach on Set receives value, value, set.
const namesSet = new Set(["Abhishek", "sagar", "tejas"]);
let forEachValues = "";
namesSet.forEach(function (value, key) {
  forEachValues += `${value} | `;
  console.log("Set forEach key/value:", key, value);
});
console.log("forEach collected values:", forEachValues);

// Sets do not support index access.
console.log("Index access 0:", setNumbers[0]);
console.log("Index access 1:", setNumbers[1]);
console.log("Index access 21:", setNumbers[21]);

// values(), entries(), and iteration.
console.log("values():", [...setStrings.values()]);
console.log("entries():", [...setStrings.entries()]);

let iterationText = "";
for (const value of setStrings.values()) {
  iterationText += value + ", ";
}
console.log("Iterated values:", iterationText);

// delete(), has(), size, clear().
const numberSet = new Set([
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
]);

console.log("Initial numberSet:", numberSet);
console.log("delete(first):", numberSet.delete("first"));
console.log("delete(missing):", numberSet.delete("tent"));
console.log("has(seventh):", numberSet.has("seventh"));
console.log("size:", numberSet.size);
console.log("length property:", numberSet.length);
numberSet.clear();
console.log("After clear():", numberSet, "size:", numberSet.size);

// Sets can contain strings and object values, but duplicate object references are ignored only if the same reference is reused.
const textSet = new Set("hello");
console.log("String Set:", textSet);

const objectValue = { a: 1, b: 2 };
const mixedSet = new Set([1, 2, 3, 3, 4, 4, 5]);
mixedSet.add("text");
mixedSet.add(objectValue);
mixedSet.add(objectValue);
console.log("Mixed Set:", mixedSet);

// Practical use: remove duplicates from an array.
const duplicateNumbers = [1, 2, 3, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(duplicateNumbers)];
console.log("Unique numbers:", uniqueNumbers);

const duplicateItems = new Set(["item1", "item2", "item3"]);
console.log("Has item2?", duplicateItems.has("item2"));
