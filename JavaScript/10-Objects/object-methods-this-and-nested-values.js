/*
  Topic: Object Methods, this, and Nested Values
  Difficulty: Beginner
  Primary Concept: Working with nested objects/arrays and object methods
*/

const profile = {
  firstName: "Abhishek",
  lastName: "Dhone",
  contact: 8888888888,
  cars: ["Mustang", "Lamborghini", "Rolls Royce"],
  cities: {
    birth: "Shahada",
    livesIn: "Nashik",
    worksIn: "Pune",
    dream: "California"
  },
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log("First name:", profile.firstName);
console.log("Last name:", profile.lastName);
console.log("First car:", profile.cars[0]);
console.log("Birth city:", profile.cities.birth);
console.log("Computed full name:", profile.getFullName());

const objectWithNonPrimitiveValues = {
  object2: {
    name: "Abhishek",
    lastName: "Dhone",
    address: {
      hometown: "Nashik"
    }
  },
  array1: [1, 2, 3, 4, 5],
  function1() {
    console.log("This is the object method");
  }
};

console.log("Nested hometown:", objectWithNonPrimitiveValues.object2.address.hometown);
console.log("Array from object:", objectWithNonPrimitiveValues.array1);
objectWithNonPrimitiveValues.function1();
