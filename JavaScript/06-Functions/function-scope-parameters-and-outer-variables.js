/*
  Topic: Function Scope, Parameters, and Outer Variables
  Difficulty: Beginner
  Primary Concept: Local scope, outer variable access, and parameter copy behavior
*/

function showMessage() {
  const localMessage = "Hello, I am Abhishek Dhone";
  console.log(localMessage);
}

showMessage();
// console.log(localMessage); // ReferenceError

let userName = "Abhishek";
let attributeOriginal = "AttriORIGINAL";

function showMessageWithOuterVariables(attributeValue) {
  const greeting = "Hello, " + userName;
  userName = "Arjun"; // modifies outer variable

  console.log(greeting);
  console.log("Inside function before update:", attributeValue);

  attributeValue = "Attri1 inside function";
  console.log("Inside function after update:", attributeValue);

  return attributeValue;
}

const modifiedAttribute = showMessageWithOuterVariables(attributeOriginal);

console.log("Outside function original value:", attributeOriginal);
console.log("Returned modified value:", modifiedAttribute);
console.log("Outer variable changed to:", userName);
