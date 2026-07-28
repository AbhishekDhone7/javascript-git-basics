/*
  Topic: Primitive and Non-Primitive Data Types
  Difficulty: Beginner
  Primary Concept: JavaScript data types and typeof behavior
*/

// 1) Primitive data types
const calculatedAge = 25 + 12 - 11 / 2;
console.log("age type:", typeof calculatedAge); // number

const firstName = "John";
const fullName = "John" + " Raja " + "Smith";
const lastName = "Smith";
const middleName = `Raja`;

console.log("firstName type:", typeof firstName); // string
console.log("lastName type:", typeof lastName); // string
console.log("middleName type:", typeof middleName); // string
console.log("fullName:", fullName);

const isStudent = true;
const isTeacher = false;
console.log("isStudent type:", typeof isStudent); // boolean
console.log("isTeacher value:", isTeacher);

let notAssigned;
console.log("notAssigned type:", typeof notAssigned); // undefined

const emptyValue = null;
console.log("emptyValue type:", typeof emptyValue); // object (historical JS quirk)

const uniqueIdOne = Symbol("symbol1");
const uniqueIdTwo = Symbol("symbol2");
console.log("symbol type:", typeof uniqueIdOne); // symbol
console.log("symbol equality:", uniqueIdOne === uniqueIdTwo); // false

const netWorth = 10000000000000000n;
console.log("netWorth type:", typeof netWorth); // bigint

// 2) Non-primitive data types
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};

console.log("person type:", typeof person); // object

function greet(name) {
  console.log("Hello, " + name + "!");
}

console.log("greet type:", typeof greet); // function

// Useful note: Numbers are precise up to Number.MAX_SAFE_INTEGER
console.log("MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
