/*
  Topic: Destructuring Assignment
  Difficulty: Beginner to Intermediate
  Primary Concept: Extracting values from objects and arrays into variables
*/

console.log("--- Object destructuring ---");
const menu = { title: "Menu", height: 200, width: 100 };
const { title, height, width } = menu;
console.log(title);
console.log(width);
console.log(height);

console.log("--- Renaming destructured properties ---");
const options = {
  main: "Menu",
  width: 500,
  height: 800,
};
const { width: w, height: h, main } = options;
console.log(w);
console.log(h);
console.log(main);

console.log("--- Default values ---");
const elem = {
  myName: "Abhishek",
  nickName: "Arjun",
};
function getNick() {
  return "No Nick Name";
}
const { nickName = getNick(), myName } = elem;
console.log(nickName);
console.log(myName);

console.log("--- Partial destructuring ---");
const emp = {
  emp_name: "Labourdeep",
  lname: "swazchmuller",
};
const { emp_name } = emp;
console.log(emp_name);

console.log("--- Object rest pattern ---");
const restOptions = {
  main: "Menu",
  width: 500,
  height: 800,
};
const { menu: menuName, ...rest } = restOptions;
console.log(menuName);
console.log(rest);
console.log(rest.height);
console.log(rest.width);

console.log("--- Assignment into existing variables ---");
let x;
let y;
let z;
({ x, y, z } = { x: "xuv", y: "yamaha", z: "zest" });
console.log(x, y, z);

console.log("--- Nested destructuring ---");
const users = {
  email: {
    id: "Dhone.Abhishek",
    mail: "@gmail.com",
  },
  fullName: ["Abhishek", "Dhone"],
  regular: true,
  city: "nashik",
};

const {
  email: { id, mail },
  fullName: [fname, sname],
  regular,
  city,
  state = "maharashtra",
} = users;

console.log(id);
console.log(mail);
console.log(fname);
console.log(sname);
console.log(regular);
console.log(city);
console.log(state);

console.log("--- Destructuring in function parameters ---");
function square({ base = 10, power = 2 }) {
  let answer = 1;
  for (let index = 0; index < power; index++) {
    answer *= base;
  }
  return answer;
}

console.log(square({ power: 2, base: 10 }));

function showUsers({
  email: { id: userId, mail: userMail },
  fullName: [firstName, surname],
  height = "182cm",
  regular: isRegular,
  city: userCity,
  state: userState = "maharashtra",
}) {
  console.log(userId, userMail, firstName, surname, height, isRegular, userCity, userState);
}

showUsers(users);

console.log("--- Safe defaults for missing object argument ---");
function showUsersAgain({ regular: isRegular, city = "unknown", state = "maharashtra" } = {}) {
  console.log(isRegular, city, state);
}
showUsersAgain();
showUsersAgain({});

console.log("--- Nested defaults in parameters ---");
function showUsersNested({
  email: { id: nestedId = "arjunsaraf111", mail: nestedMail = "@gmail.com" } = {},
  regular: isNestedRegular,
  city: nestedCity = "unknown",
  state: nestedState = "maharashtra",
} = { email: {} }) {
  console.log(isNestedRegular, nestedCity, nestedState);
  console.log(nestedId, nestedMail);
}

showUsersNested();

console.log("--- Function examples with object destructuring ---");
function details({
  name,
  age,
  address = "Maharashtra, India",
  hobbies = "not available",
  salary = "not disclosed",
}) {
  console.log(`Name is ${name}, Age is ${age}, Address is ${address}, Hobbies are ${hobbies}, Salary is ${salary}`);
}

details({
  name: "Abhishek",
  age: "28",
  hobbies: ["Flute", "Reading non fiction"],
  salary: "$1 Million / Yr",
});

console.log("--- Array destructuring ---");
const fruits = ["Apple", "Banana", "Cherry"];
const [firstFruit, secondFruit, thirdFruit] = fruits;
console.log(firstFruit);
console.log(secondFruit);
console.log(thirdFruit);

const [head, ...tail] = fruits;
console.log(head);
console.log(tail);

console.log("--- Swapping values ---");
let first = "left";
let second = "right";
[first, second] = [second, first];
console.log(first, second);

console.log("--- Nested arrays ---");
const nested = [1, [2, 3], 4];
const [one, [two, three], four] = nested;
console.log(one, two, three, four);

console.log("--- Destructuring with skipped items ---");
const colors = ["red", "green", "blue", "yellow"];
const [, middleColor, , lastColor] = colors;
console.log(middleColor);
console.log(lastColor);

console.log("--- Destructuring in loops ---");
const pointEntries = [
  ["x", 10],
  ["y", 20],
];
for (const [key, value] of pointEntries) {
  console.log(key, value);
}

console.log("--- Notes ---");
// Parentheses are required when assigning to existing variables using destructuring.
// Nested defaults often need a default object as well, such as = {} or = { email: {} }.
