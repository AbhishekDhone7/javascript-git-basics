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

// ---------------- Prototypal inheritance ----------------
const country = {
  nation: "India",
  greatFor: "Unity in Diversity",
  patriotSays() {
    console.log("India is the best country in the world");
  },
  locatedIn() {
    console.log("It is located in Asia continent");
  },
  set politicalHead(value) {
    [this.fname, this.lname] = value.split(" ");
  },
  get politicalHead() {
    return `${this.fname} ${this.lname}`;
  },
};

const state = {
  sname: "Maharashtra",
  greatFor: "Culture, Business and Highest GSDP",
  locatedIn() {
    console.log("It is located in India's western part");
  },
};

state.__proto__ = country;
console.log("Inherited nation from country:", state.nation);
state.patriotSays();
country.patriotSays();
console.log("Child own greatFor:", state.greatFor);
console.log("Parent greatFor:", country.greatFor);
country.locatedIn();
state.locatedIn();

country.politicalHead = "Narendra Modi";
state.politicalHead = "Eknath Shinde";
console.log("Country politicalHead fields:", country.fname, country.lname);
console.log("State politicalHead fields:", state.fname, state.lname);

// Inherited properties show up in for...in, but not Object.keys.
const animal = {
  eats: true,
};

const rabbit = {
  jumps: true,
  __proto__: animal,
};

console.log("Object.keys(rabbit):", Object.keys(rabbit));
for (const prop in rabbit) {
  console.log("for...in prop:", prop);
}

for (const prop in rabbit) {
  const isOwn = rabbit.hasOwnProperty(prop);
  console.log(isOwn ? `Own: ${prop}` : `Inherited: ${prop}`);
}

// Reading through prototype chain.
const longEar = {
  earLength: 10,
  __proto__: rabbit,
};
console.log("longEar.jumps:", longEar.jumps);
console.log("longEar.eats:", longEar.eats);

// Writing always affects the object itself.
rabbit.walk = function () {
  return "Rabbit! Bounce-bounce!";
};
console.log(rabbit.walk());

// Accessors on the prototype use the receiving object as `this`.
const user = {
  name: "John",
  surname: "Smith",
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

const admin = {
  __proto__: user,
  isAdmin: true,
};

console.log("admin.fullName before set:", admin.fullName);
admin.fullName = "Alice Cooper";
console.log("admin.fullName after set:", admin.fullName);
console.log("user.fullName remains:", user.fullName);

// Methods work with the current receiver object.
const sleepingAnimal = {
  walk() {
    if (!this.isSleeping) {
      console.log("I walk");
    }
  },
  sleep() {
    this.isSleeping = true;
  },
};

const whiteRabbit = {
  name: "White Rabbit",
  __proto__: sleepingAnimal,
};

whiteRabbit.sleep();
console.log("whiteRabbit.isSleeping:", whiteRabbit.isSleeping);
console.log("sleepingAnimal.isSleeping:", sleepingAnimal.isSleeping);

// A quick getter/setter example on a class to match the accessor discussion.
class CoffeeMachine {
  constructor(power) {
    this._power = power;
    this._waterAmount = 0;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount + "ML";
  }

  get power() {
    return this._power;
  }
}

const cm1 = new CoffeeMachine(100);
cm1.waterAmount = 10;
console.log("CoffeeMachine waterAmount:", cm1.waterAmount);
cm1.waterAmount = -10;
console.log("CoffeeMachine waterAmount after negative:", cm1.waterAmount);
console.log("CoffeeMachine power:", cm1.power);
