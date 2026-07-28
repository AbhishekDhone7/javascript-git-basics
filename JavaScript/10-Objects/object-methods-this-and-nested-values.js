/*
  Topic: Object Methods, this, and Nested Values
  Difficulty: Beginner
  Primary Concept: Working with nested objects/arrays and object methods
*/

// Objects can model real-world entities and expose behavior through methods.
const user = {
  fname: "Abhishek",
  lname: "Dhone",
  permission: "full access",
  birth: 1857,

  changePermission: function () {
    this.permission = "partial access";
    return "permission changed to " + this.permission;
  },

  getFullname: function () {
    return this.fname + " " + this.lname;
  },
};

console.log("Full name:", user.getFullname());
console.log("Permission before change:", user.permission);
console.log(user.changePermission());
console.log("Permission after change:", user.permission);

// Method assignment after object creation.
const user2 = {};
user2.age = function () {
  return 28;
};
console.log("user2.age():", user2.age());

// Method shorthand syntax.
const user3 = {
  sayHi() {
    console.log("Hello Programmer..!");
  },
};
user3.sayHi();

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

// this depends on the call site.
const users = {
  firstName: "Abhishek",
  sayHi() {
    console.log("Object method this:", this.firstName);

    const normalFunc = function () {
      console.log("Nested normal function this.firstName:", this.firstName);
    };

    const arrow = () => {
      console.log("Nested arrow function this.firstName:", this.firstName);
    };

    normalFunc();
    arrow();
  },

  arrow: () => {
    console.log("Arrow method this.firstName:", this.firstName);
  },
};

users.sayHi();
users.arrow();

// Borrowing methods with call() / bind().
const person1 = {
  name: "Jane",
  greet() {
    console.log("Hello, my name is " + this.name);
  },
};

const person2 = { name: "Nayan" };
person1.greet();
person1.greet.call(person2);

const greetVariable = person1.greet;
try {
  greetVariable();
} catch (error) {
  console.log("Detached method error:", error.name);
}

const boundGreet = person1.greet.bind(person1);
boundGreet();

// Nested object `this` points to the nested object, not the parent.
const company = {
  name: "Tech Solutions",
  department: {
    name: "Development",
    getDepartmentName() {
      return this.name;
    },
  },
};

console.log("Department name:", company.department.getDepartmentName());
