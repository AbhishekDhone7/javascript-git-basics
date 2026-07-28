/*
  Topic: ES6 Features Overview
  Difficulty: Beginner to Intermediate
  Primary Concept: A guided tour of the most important ES6 features
*/

console.log("--- let and const ---");
let mutableCount = 1;
const fixedLabel = "ES6";
{
  let blockScopedValue = 10;
  console.log("blockScopedValue:", blockScopedValue);
}
mutableCount += 1;
console.log("mutableCount:", mutableCount);
console.log("fixedLabel:", fixedLabel);

console.log("--- Template literals and defaults ---");
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}
console.log(greet());
console.log(greet("Abhishek"));

console.log("--- Destructuring ---");
const user = {
  name: "John",
  age: 30,
  city: "Pune",
};
const { name: userName, age } = user;
const colors = ["red", "green", "blue"];
const [firstColor, secondColor] = colors;
console.log(userName, age);
console.log(firstColor, secondColor);

console.log("--- Rest and spread ---");
function sumAll(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}
const values = [1, 2, 3];
console.log("sumAll:", sumAll(...values, 4));
console.log("spread array:", [...values, 4, 5]);

console.log("--- Enhanced object literals ---");
const city = "Mumbai";
const population = 20000000;
const location = {
  city,
  population,
  describe() {
    return `${this.city} has population ${this.population}`;
  },
};
console.log(location.describe());

console.log("--- Classes, extends, super, static ---");
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi, I am ${this.name}`;
  }

  static species() {
    return "Homo sapiens";
  }
}

class Employee extends Person {
  constructor(name, employeeId) {
    super(name);
    this.employeeId = employeeId;
  }

  describe() {
    return `${super.sayHi()} and my employee id is ${this.employeeId}`;
  }
}

const employee = new Employee("Abhishek", "E123");
console.log(employee.describe());
console.log(Person.species());

console.log("--- for...of ---");
for (const color of colors) {
  console.log("color:", color);
}

console.log("--- Map and Set ---");
const map = new Map();
map.set("name", "Map Demo");
map.set({ id: 1 }, "object key works");
console.log("map size:", map.size);
console.log("map get name:", map.get("name"));

const set = new Set([1, 2, 2, 3]);
set.add(4);
console.log("set values:", [...set]);

console.log("--- Symbol ---");
const id = Symbol("id");
const account = {
  [id]: 12345,
  name: "Admin",
};
console.log("symbol property:", account[id]);
console.log("symbol keys:", Object.getOwnPropertySymbols(account).length);

console.log("--- Generators ---");
function* numberSequence() {
  yield 1;
  yield 2;
  yield 3;
}
console.log([...numberSequence()]);

console.log("--- Promises ---");
async function runPromiseDemo() {
  const resolvedValue = await Promise.resolve("Promise resolved");
  console.log(resolvedValue);
}

console.log("--- Proxy and Reflect ---");
const target = { name: "Proxy target" };
const proxy = new Proxy(target, {
  get(currentTarget, property, receiver) {
    console.log(`reading ${String(property)}`);
    return Reflect.get(currentTarget, property, receiver);
  },
});
console.log(proxy.name);

console.log("--- Unicode and Intl ---");
const smile = "😀";
console.log("smile length:", smile.length);
console.log("smile code points:", [...smile].length);
console.log("date format:", new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date("2026-07-28")));
console.log("number format:", new Intl.NumberFormat("en-IN").format(1234567.89));

console.log("--- Built-in methods and spread-friendly updates ---");
const numbers = [9, 2, 7];
console.log("Math.max:", Math.max(...numbers));
console.log("Object.assign:", Object.assign({}, { a: 1 }, { b: 2 }));

console.log("--- Comments only: modules and tail-call optimization ---");
// Modules use import/export and are covered in the modules section.
// Tail-call optimization is a specification concept and is not reliably observable in all engines.

runPromiseDemo().then(() => {
  console.log("--- Done ---");
});
