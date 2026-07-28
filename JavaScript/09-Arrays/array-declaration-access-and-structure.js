/*
  Topic: Array Declaration, Access, and Structure
  Difficulty: Beginner
  Primary Concept: Creating arrays and reading values safely
*/

// Arrays can hold same or mixed data types.
const mixedValues = [
  1,
  "there",
  {
    firstName: "Abhishek",
    lastName: "Dhone"
  },
  ["Mustang", "Lamborghini", "Rolls Royce", "Bentley", "Dodge Challenger"]
];

console.log("First value:", mixedValues[0]);
console.log("Second value:", mixedValues[1]);
console.log("Object firstName:", mixedValues[2].firstName);
console.log("Object lastName:", mixedValues[2].lastName);
console.log("Nested array first car:", mixedValues[3][0]);
console.log("Nested array second car:", mixedValues[3][1]);

// Sparse arrays can contain empty slots (holes).
const sparseArray = [1, 2, 3, 4, 5, , , 9];
console.log("Sparse array:", sparseArray);
console.log("Value at index 6:", sparseArray[6]); // undefined

// Two ways to create arrays.
const arrayFromConstructor = new Array();
arrayFromConstructor[0] = 1;
arrayFromConstructor[1] = 2;
arrayFromConstructor[5] = 5;

const arrayLiteral = [];

console.log("Array from constructor:", arrayFromConstructor);
console.log("Array from literal:", arrayLiteral);
console.log("Missing index 2:", arrayFromConstructor[2]); // undefined

// Standard array with initial values.
const fruits = ["Apple", "Orange", "Plum"];
console.log("Initial fruits:", fruits);
console.log("First element:", fruits[0]);
console.log("Second element:", fruits[1]);
console.log("Third element:", fruits[2]);

// Update and add elements by index.
fruits[2] = "Pear";
fruits[3] = "Lemon";

console.log("Updated fruits:", fruits);
console.log("Array length:", fruits.length);

// Arrays can store mixed values, including functions.
const mixedArray = [
  "Apple",
  { name: "John" },
  true,
  function sayHello() {
    console.log("hello");
  }
];

console.log("Mixed array:", mixedArray);
console.log("Object inside array:", mixedArray[1].name);
mixedArray[3]();

// Basic array indexing with mixed data and nested structures.
const array1 = [
  1,
  "there",
  {
    name: "Abhishek",
    lname: "Dhone",
  },
  ["Mustang", "Lamborghini", "Rolls Royce", "Bentley", "Dodge Challenger"],
];

console.log("array1[0]:", array1[0]);
console.log("array1[1]:", array1[1]);
console.log("array1[2].name:", array1[2].name);
console.log("array1[2].lname:", array1[2].lname);
console.log("array1[3][0]:", array1[3][0]);
console.log("array1[3][1]:", array1[3][1]);
console.log("array1[3][2]:", array1[3][2]);
console.log("array1[3][3]:", array1[3][3]);

// at(-1) gets the last item without mutating the array.
console.log("Last element using at(-1):", fruits.at(-1));

// Trailing comma style is valid and common in modern codebases.
const trailingCommaArray = [
  "Apple",
  "Orange",
  "Plum",
];
console.log("Trailing comma array:", trailingCommaArray);
