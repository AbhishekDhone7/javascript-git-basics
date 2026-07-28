/*
  Topic: Rest Parameters and Spread Syntax
  Difficulty: Beginner to Intermediate
  Primary Concept: Collecting remaining values with rest and expanding values with spread
*/

console.log("--- Rest parameters ---");
function sum(...numbers) {
  return numbers.reduce((total, current) => total + current, 0);
}
console.log(sum(1, 2, 3));
console.log(sum(1, 10, 100, 1000));

function registerUser(username, ...options) {
  console.log(`Username: ${username}`);
  console.log("Options:", options);
}
registerUser("johnDoe", "option1", "option2", "option3");

const multiply = (...args) => args.reduce((acc, val) => acc * val, 1);
console.log(multiply(2, 3, 4));

console.log("--- Rest must be last ---");
function showNames(firstName, lastName, ...allNames) {
  console.log(`${firstName} ${lastName}`);
  for (const name of allNames) {
    console.log("next name:", name);
  }
}
showNames("Krishna", "Yadav", "Murlidhar", "Shyam", "Gopal");

console.log("--- Spread with arrays ---");
const array = [1, 2, 3, 4, 5, 6, 7, 8];
function logNumbers(a, b, c, d, ...rest) {
  console.log(a, b, c, d);
  console.log(rest);
}
logNumbers(...array);

const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(array1);
console.log(...array1);

const arr1 = [1, -2, 3, 4];
const arr2 = [8, 3, -8, 1];
console.log("Largest number:", Math.max(1, ...arr1, 2, ...arr2, 25));

const arr3 = [3, 5, 1];
const arr4 = [8, 9, 15];
const merged = [0, ...arr3, 2, ...arr4];
console.log(merged);

const originalValues = [1, 2, 3];
const copiedValues = [...originalValues];
console.log(JSON.stringify(originalValues) === JSON.stringify(copiedValues));
console.log(originalValues === copiedValues);

const scores = [98, 95, 93, 90, 88, 85];
const [top1, top2, ...others] = scores;
console.log(`Top 1: ${top1}, Top 2: ${top2}, Others: ${others}`);

const fruits = ["Apple", "Banana", "Orange", "Mango", "Pineapple"];
const [first, second, ...remaining] = fruits;
console.log(first);
console.log(second);
console.log(remaining);

const greeting = "Hello";
const chars = [...greeting];
console.log(chars);
console.log(...greeting);

const spreadFruits = ["Strawberry", ...fruits, "Pineapple"];
console.log(spreadFruits);

const stringAsArray = "Abhishek Dhone";
console.log([...stringAsArray]);

console.log("Array.from on string:", Array.from(stringAsArray));
console.log("Spread on string:", [...stringAsArray]);

console.log("--- `arguments` versus rest ---");
function showArgsArray(firstName) {
  console.log(`${firstName} ${arguments[1]}`);
  for (const value of arguments) {
    console.log("argument:", value);
  }
}
showArgsArray("Krishna", "Yadav", "Murlidhar", "Shyam", "Gopal");

function outerForArrowArguments() {
  const arrowUsesOuterArguments = () => arguments[1];
  return arrowUsesOuterArguments();
}
console.log("arrow sees outer arguments:", outerForArrowArguments("first", "second", "third"));
console.log("arrow functions do not create their own arguments object; they read the nearest outer one.");

console.log("--- Spread in function calls ---");
const values = [10, 20, 30];
console.log(Math.max(...values));
console.log(Math.min(...values));

const user = { name: "John Doe", age: 28 };
const updatedUser = { ...user, location: "USA", age: 30 };
console.log(updatedUser);

function sumAll(...values) {
  let total = 0;
  for (const currentValue of values) {
    total += currentValue;
  }
  return total;
}
console.log(sumAll(1));
console.log(sumAll(1, 10, 100));
console.log(sumAll(1, 10, 100, 1000));

console.log("--- Spread for cloning and merging ---");
const baseUser = { name: "janeDoe", email: "jane@example.com" };
const withExtras = { ...baseUser, age: 30, country: "USA" };
const copiedUser = { ...withExtras };
console.log(withExtras);
console.log(copiedUser);

const mergedList = [...[1, 2], ...[3, 4], 5];
console.log(mergedList);

let sourceObject = { a: 1, b: 2, c: 3 };
let copiedObject = { ...sourceObject };
console.log(JSON.stringify(sourceObject) === JSON.stringify(copiedObject));
console.log(sourceObject === copiedObject);

sourceObject.d = 4;
console.log(JSON.stringify(sourceObject));
console.log(JSON.stringify(copiedObject));

console.log("--- Rest and spread together in destructuring ---");
const userProfile = {
  username: "janeDoe",
  email: "jane@example.com",
  age: 30,
  country: "USA",
};

function displayProfile({ username, ...rest }) {
  console.log(`Username: ${username}`);
  console.log("Other details:", rest);
}

displayProfile(userProfile);

console.log("--- Notes ---");
// Rest collects remaining values into an array or object.
// Spread expands an iterable or object into separate elements or properties.
// Array.from works on array-like values and iterables, while spread requires iterables.
// In function declarations, rest must be the final parameter.
