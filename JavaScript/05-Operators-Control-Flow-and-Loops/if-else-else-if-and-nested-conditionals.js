/*
  Topic: if, else-if, else, and Nested Conditionals
  Difficulty: Beginner
  Primary Concept: Writing branching logic with condition chains
*/

// Example 1: Weather condition chain
const temperature = 10;

if (temperature > 30 && temperature < 45) {
  console.log("It's a hot day!");
} else if (temperature >= 25 && temperature < 30) {
  console.log("It's a normal day!");
} else {
  if (temperature >= 45) {
    console.log("It is extremely hot temperature");
  }

  if (temperature < 25) {
    console.log("It is extremely cold temperature");
  }
}

// Example 2: Basic if-else
const hour = 14;

if (hour < 12) {
  console.log("Good morning!");
} else {
  console.log("Good afternoon!");
}

// Example 3: Nested if statement
const userAge = 18;
const hasId = true;

if (userAge >= 18) {
  console.log("You are eligible to enter.");

  if (hasId) {
    console.log("You have a valid ID. Welcome!");
  } else {
    console.log("You need to have a valid ID to enter.");
  }
} else {
  console.log("You are too young to enter.");
}

// Example 4: else-if chain
const timeOfDay = "evening";

if (timeOfDay === "morning") {
  console.log("Good morning!");
} else if (timeOfDay === "afternoon") {
  console.log("Good afternoon!");
} else if (timeOfDay === "evening") {
  console.log("Good evening!");
} else {
  console.log("Good night!");
}
