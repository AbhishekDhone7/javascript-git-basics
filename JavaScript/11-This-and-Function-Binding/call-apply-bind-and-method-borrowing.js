/*
  Topic: call, apply, bind, and Method Borrowing
  Difficulty: Intermediate
  Primary Concept: Reusing methods across objects and controlling this explicitly
*/

const person = {
  fname: "Bablu",
  lname: "Kumar",
  fullName() {
    return this.fname + " " + this.lname;
  },
};

const person1 = {
  fname: "Abhishek",
  lname: "Dhone",
};

const person2 = {
  fname: "Bhushan",
  lname: "Gaikwad",
};

console.log("person.fullName():", person.fullName());
console.log("person.fullName.call(person2):", person.fullName.call(person2));

const empDetails = {
  fullName(city, country, hobby) {
    return this.fname + " " + this.lname + " " + city + " " + country + " " + hobby;
  },
};

const employee1 = {
  fname: "Bhushan",
  lname: "Gaikwad",
};

const employee2 = {
  fname: "Nayan",
  lname: "Saraf",
};

console.log("call with args:", empDetails.fullName.call(employee1, "Bangalore", "India", "Cricket"));
console.log("call with args:", empDetails.fullName.call(employee2, "Nashik", "India", "Football"));
console.log("apply with array:", empDetails.fullName.apply(employee1, ["Bangalore", "India", "Cricket"]));

function childFunction(firstArgument, secondArgument) {
  console.log(this.parentMessage, firstArgument, secondArgument);
}

const parentObj = {
  parentMessage: "Parent context message",
};

childFunction("Hey", "Hello!");
childFunction.call(parentObj, "Hello", "Team");
childFunction.apply(parentObj, ["Hello", "Team"]);

// bind returns a new function with this permanently set.
const boundChildFunction = childFunction.bind(parentObj, "firstArgument");
boundChildFunction("secondArgument");

// Method borrowing: one object reuses another object's method.
const member = {
  fname: "Sana",
  lname: "Shaikh",
};

member.fullName = person.fullName;
console.log("Borrowed method result:", member.fullName());

// bind is useful when passing methods as callbacks.
const person3 = {
  firstName: "John",
  lastName: "Doe",
  display() {
    return this.firstName + " " + this.lastName;
  },
};

const detachedDisplay = person3.display;
console.log("Detached display result:", detachedDisplay.call(person3));
console.log("Bound display result:", person3.display.bind(person3)());

// Losing context in callbacks and preserving it with bind.
const person4 = {
  firstName: "Jane",
  lastName: "Roe",
  display() {
    return this.firstName + " " + this.lastName;
  },
};

const callback = person4.display.bind(person4);
console.log("Callback with bind:", callback());

// apply can be used with built-in functions like Math.max.
const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Math.max(...numberList):", Math.max(...numberList));
console.log("Math.max.apply(null, numberList):", Math.max.apply(null, numberList));

// Strict-mode note: call/apply/bind control the runtime this value for normal functions.
