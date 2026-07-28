/*
  Topic: Object.values and JSON.stringify
  Difficulty: Beginner
  Primary Concept: Converting object data for iteration and serialization
*/

const person = {
  firstName: "Abhishek",
  lastName: "Dhone",
  contact: 8888888888,
  cities: {
    birth: "Shahada",
    livesIn: "Nashik"
  },
  greet() {
    return `Hello from ${this.firstName}`;
  }
};

const valuesArray = Object.values(person);
console.log("Object.values output:", valuesArray);

const jsonString = JSON.stringify(person);
console.log("JSON.stringify output:", jsonString);

// Note: Functions are omitted when converting to JSON.
