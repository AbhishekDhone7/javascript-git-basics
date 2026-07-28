/*
  Topic: this Context and Arrow Function Behavior
  Difficulty: Beginner to Intermediate
  Primary Concept: How this changes across methods, regular functions, and arrow functions
*/

const user = {
  username: "hitesh",
  price: 999,
  welcomeMessage: function welcomeMessage() {
    console.log(`${this.username}, welcome to website`);
    console.log("Method this.username:", this.username);
  },
};

console.log("Object method call:");
user.welcomeMessage();

user.username = "sam";
console.log("After username update:");
user.welcomeMessage();

// In Node.js CommonJS modules, top-level this is module.exports (an object),
// not the browser window object.
console.log("Top-level this type:", typeof this);

function regularFunctionThis() {
  console.log("regular function this type:", typeof this);
}
regularFunctionThis();

const functionExpressionThis = function () {
  console.log("function expression this type:", typeof this);
  console.log("function expression this.username:", this.username);
};
functionExpressionThis();

const arrowThis = () => {
  console.log("arrow this type:", typeof this);
  console.log("arrow this.username:", this.username);
};
arrowThis();

// Arrow return styles
const addTwoBlockBody = (num1, num2) => {
  return num1 + num2;
};

const addTwoImplicit = (num1, num2) => num1 + num2;

const returnObjectFromArrow = (num1, num2) => ({
  username: "hitesh",
  sum: num1 + num2,
});

console.log("addTwo block body:", addTwoBlockBody(3, 4));
console.log("addTwo implicit:", addTwoImplicit(3, 4));
console.log("arrow returning object:", returnObjectFromArrow(3, 4));
