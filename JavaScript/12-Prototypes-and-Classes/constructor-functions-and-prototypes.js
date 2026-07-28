/*
  Topic: Constructor Functions and Prototypes
  Difficulty: Intermediate
  Primary Concept: Creating objects with constructor functions and sharing behavior with prototypes
*/

// Direct object literal for comparison.
const person0 = {
  name: "Abhishek",
  age: 30,
  describe() {
    return `${this.name} is ${this.age} years old.`;
  },
};

console.log("Object literal:", person0.describe());

// Constructor function: name starts with a capital letter by convention.
function Person(name, age) {
  this.name = name;
  this.age = age;

  // Methods defined inside the constructor are recreated for every instance.
  this.describe = function () {
    return `${this.name} is ${this.age} years old.`;
  };
}

const person1 = new Person("Abhishek", 21);
const person2 = new Person("Vikrant", 21);
console.log("Person 1:", person1.describe());
console.log("Person 2:", person2.describe());
console.log("person1 instance:", person1);

// Prototype methods are shared by all instances.
function Animal(type, sound) {
  this.type = type;
  this.sound = sound;
}

Animal.prototype.makeSound = function () {
  return `${this.type} says ${this.sound}`;
};

Animal.prototype.pet = true;

const dog = new Animal("Dog", "Woof");
const cat = new Animal("Cat", "Meow");
console.log(dog.makeSound());
console.log(dog.pet);
console.log(cat.makeSound());
console.log(cat.pet);

// Constructors with explicit return values.
function Vehicle(type) {
  this.type = type;

  // Returning an object replaces the implicit this return.
  return {
    type: "Alien Ship",
  };
}

const myVehicle = new Vehicle("Car");
const myVehicle2 = new Vehicle("Bike");
console.log("Vehicle 1 type:", myVehicle.type);
console.log("Vehicle 2 type:", myVehicle2.type);

// If the constructor doesn't return an object, `this` is returned implicitly.
function Gadget(name) {
  this.name = name;
}

const myGadget = new Gadget("Smartphone");
console.log("Gadget name:", myGadget.name);

// Forgetting `new` in non-strict mode can write to the global object.
function LegacyTool(name) {
  this.name = name;
}

const legacyTool = LegacyTool("Hammer");
console.log("Legacy tool return value without new:", legacyTool);
console.log("Global name after missing new:", globalThis.name);

// Prototypes can add shared methods and properties after instances exist.
function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

User.prototype.role = "member";

const user1 = new User("Alice", 30);
const user2 = new User("Bob", 25);
user1.greet();
user2.greet();
console.log("user1 role:", user1.role);
console.log("user2 role:", user2.role);

// Shared prototype reference check.
console.log("Shared prototype:", Object.getPrototypeOf(user1) === User.prototype);

// Constructor functions can be used to create reusable UI-like models.
function Modal(title, content) {
  this.title = title;
  this.content = content;
}

Modal.prototype.display = function () {
  console.log(`Displaying modal - Title: ${this.title}, Content: ${this.content}`);
};

const welcomeModal = new Modal("Welcome", "Hello to our service!");
welcomeModal.display();

// Optional: inspecting property ownership.
console.log("user1 hasOwnProperty name:", Object.hasOwn(user1, "name"));
console.log("user1 hasOwnProperty greet:", Object.hasOwn(user1, "greet"));
