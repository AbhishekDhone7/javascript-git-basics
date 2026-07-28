/*
  Topic: Array Callback Methods and Iterators
  Difficulty: Beginner to Intermediate
  Primary Concept: Using callback-based methods and iterators safely
*/

const numbers = [
  1, 2, 3, 4, 5, 12, 32, 22, 23, 43, 34, 555, 64, 51, 123, 1234, 4321, 321,
  231, 244, 432, 51, 632,
];

const cities = [
  "Pune",
  "Nashik",
  "Pune",
  "Mumbai",
  "Nagpur",
  "Nandurbar",
  "Dhule",
  "Pune",
  "Pune",
];

console.log("Universal numbers array:", numbers);
console.log("Universal strings array:", cities);

// Callback signatures often receive: value, index, array.
let concatenatedText = "";
numbers.forEach(function forEachDemo(value, index) {
  concatenatedText += value + ", ";
  if (index < 3) {
    console.log("forEach index sample:", index);
  }
});
console.log("forEach concatenated text:", concatenatedText);

// Third callback parameter is the same array reference.
const callbackReferenceDemo = [10, 20, 30];
callbackReferenceDemo.forEach(function mutateWithThirdParam(value, index, originalArray) {
  if (index === 0) {
    originalArray[2] = 999;
  }
  console.log("forEach value after possible mutation:", value);
});
console.log("Third-parameter mutation demo:", callbackReferenceDemo);

// map returns a new transformed array.
const doubledNumbers = numbers.map(function mapDemo(value) {
  return value * 2;
});
console.log("map doubled numbers:", doubledNumbers.slice(0, 10), "...");

// filter returns a new array with matching items.
const over18 = numbers.filter(function filterDemo(value) {
  return value > 18;
});
console.log("filter numbers > 18:", over18.slice(0, 10), "...");

// reduce combines array values into one result.
const sum = numbers.reduce(function reduceDemo(total, value) {
  return total + value;
}, 0);
console.log("reduce sum:", sum);

const sumWithInitial = numbers.reduce(function reduceWithInitial(total, value) {
  return total + value;
}, 200);
console.log("reduce sum with initial 200:", sumWithInitial);

// reduceRight works from right to left.
const rightCombined = ["A", "B", "C"].reduceRight(function reduceRightDemo(total, value) {
  return total + value;
}, "");
console.log("reduceRight combine:", rightCombined); // CBA

// every and some return booleans.
const allAbove10 = numbers.every(function everyDemo(value) {
  return value > 10;
});
const someAbove10 = numbers.some(function someDemo(value) {
  return value > 10;
});
console.log("every > 10:", allAbove10);
console.log("some > 10:", someAbove10);

// indexOf / lastIndexOf search by exact value.
console.log("indexOf Pune:", cities.indexOf("Pune"));
console.log("lastIndexOf Pune:", cities.lastIndexOf("Pune"));

// find returns first value that matches.
const firstNumberAbove10 = numbers.find(function findNumberDemo(value) {
  return value > 10;
});
const firstPune = cities.find(function findCityDemo(value) {
  return value === "Pune";
});
console.log("find first number > 10:", firstNumberAbove10);
console.log("find first city Pune:", firstPune);

// Array.from can build arrays from iterables/array-like values.
const alphabetArray = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
console.log("Array.from string sample:", alphabetArray.slice(0, 6), "...");

const arrayLikeObject = { 0: "zero", 1: "one", length: 2 };
const fromArrayLike = Array.from(arrayLikeObject);
console.log("Array.from array-like object:", fromArrayLike);

// keys() and entries() return iterators (single-use iteration state).
const cityKeys = cities.keys();
let keyText = "";
for (const key of cityKeys) {
  keyText += key + " ";
}
console.log("keys iterator output:", keyText.trim());

// Recreate iterator before iterating again.
for (const key of cities.keys()) {
  if (key < 3) {
    console.log("key sample:", key);
  }
}

const cityEntries = cities.entries();
let entriesText = "";
for (const entry of cityEntries) {
  entriesText += `[${entry[0]}:${entry[1]}] `;
}
console.log("entries iterator output:", entriesText.trim());
