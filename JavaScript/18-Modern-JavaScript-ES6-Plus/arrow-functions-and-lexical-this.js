/*
  Topic: Arrow Functions and Lexical this
  Difficulty: Beginner to Intermediate
  Primary Concept: Arrow syntax, implicit returns, and lexical this binding
*/

// Basic arrow syntax examples.
const calculateScaledSum = (num1, num2) => {
  const total = num1 + num2;
  return total * 10;
};

const singleParam = name => `Hello, ${name}!`;
const noParams = () => 110;
const implicitReturn = (a, b) => a + b;
const returnObject = (name, age) => ({ name, age });

console.log("add(2, 3):", calculateScaledSum(2, 3));
console.log("singleParam('Alice'):", singleParam("Alice"));
console.log("noParams():", noParams());
console.log("implicitReturn(10, 5):", implicitReturn(10, 5));
console.log("returnObject('John', 30):", returnObject("John", 30));

// Arrow functions are ideal for array callbacks.
const names = ["Abhishek", "Nayan", "Bhushan", "Romesh"];
const lengths = names.map(arrElement => arrElement.length);
console.log("name lengths:", lengths);

// Rest and default parameters in arrows.
const calculateCart = (...prices) => prices.reduce((total, price) => total + price, 0);
const discountPrice = (price = 400, discount = 20) => price - discount;

console.log("calculateCart:", calculateCart(100, 200, 3000, 4000));
console.log("discountPrice():", discountPrice());
console.log("discountPrice(500, 50):", discountPrice(500, 50));

// Destructuring in arrow parameters.
const sumArrayPair = ([first, second] = [10, 20]) => first + second;
const sumObjectPair = ({ a, b } = { a: 10, b: 20 }) => a + b;

console.log("sumArrayPair():", sumArrayPair());
console.log("sumObjectPair():", sumObjectPair());

// Lexical this inside object methods.
const lexicalContextObject = {
  a: 123,
  b: 20,
  c: 277,
  sumMethod() {
    console.log("sumMethod this.a and this.b:", this.a, this.b);
    return this.a + this.b;
  },

  sumFunc() {
    console.log("sumFunc this.a and this.b:", this.a, this.b);
    return this.a + this.b;
  },

  nestedFunc() {
    function nestedRegularFunction() {
      console.log("nested normal function this.a and this.b:", this.a, this.b);
      return this.a + this.b;
    }

    return nestedRegularFunction();
  },

  getSum() {
    const nestedArrowFunction = () => {
      console.log("nested arrow this.a and this.b:", this.a, this.b);
      return this.a + this.b;
    };

    return nestedArrowFunction();
  },

  getSumAgain() {
    return (() => {
      console.log("IIFE arrow this.a, this.b, this.c:", this.a, this.b, this.c);
      return this.a + this.b + this.c;
    })();
  },
};

console.log("lexicalContextObject.getSum():", lexicalContextObject.getSum());
console.log("lexicalContextObject.getSumAgain():", lexicalContextObject.getSumAgain());
console.log("lexicalContextObject.sumFunc():", lexicalContextObject.sumFunc());
console.log("lexicalContextObject.sumMethod():", lexicalContextObject.sumMethod());
console.log("lexicalContextObject.nestedFunc():", lexicalContextObject.nestedFunc());

// Arrow functions do not have their own `this`.
const arrowMethodContextExample = {
  a: 10,
  b: 20,
  c: "no value",
  getSum: function () {
    console.log("Yes you can see me");
    const nestedArrow = () => {
      const combinedValue = this.a + this.b;
      console.log("Arrow inside method sum:", combinedValue);
      return combinedValue;
    };
    console.log("nestedArrow():", nestedArrow());
    return nestedArrow();
  },

  getOtherSum: () => {
    const combinedValue = this.a + this.b;
    console.log("Arrow method getOtherSum sum:", combinedValue);
    return combinedValue;
  },
};

console.log("arrowMethodContextExample.getSum():", arrowMethodContextExample.getSum());
console.log("arrowMethodContextExample.getOtherSum():", arrowMethodContextExample.getOtherSum());

// Call/apply/bind do not change an arrow function's lexical this.
const lexicalContext = {
  title: "Our Group",
  showTitle() {
    const arrow = () => this.title;
    return arrow();
  },
};

console.log("lexicalContext.showTitle():", lexicalContext.showTitle());
console.log("call on arrow-returning method:", lexicalContext.showTitle.call({ title: "Other Group" }));

const arrowFunction = () => {
  return typeof this;
};
console.log("Top-level arrow this type:", arrowFunction());
console.log("Arrow call() result:", arrowFunction.call({ title: "ignored" }));
console.log("Arrow bind() result:", arrowFunction.bind({ title: "ignored" })());

// Using arrow functions with setTimeout keeps the outer method context.
const delayedUpdateExample = {
  count: 10,
  doSomethingLater() {
    setTimeout(() => {
      this.count++;
      console.log("delayedUpdateExample.count after timeout:", this.count);
    }, 10);
  },
};
delayedUpdateExample.doSomethingLater();

// Arrow functions do not work well as object methods when you need object-bound this.
const group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],
  showList() {
    this.students.forEach(student => {
      console.log(this.title + ": " + student);
    });
  },
};
group.showList();

// Limitations summary (kept as comments for clarity):
// - No own `this`, `arguments`, or `super`
// - Not usable with `new`
// - Not appropriate for methods that require dynamic this
