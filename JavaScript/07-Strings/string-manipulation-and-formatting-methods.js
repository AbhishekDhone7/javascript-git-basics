/*
  Topic: String Manipulation and Formatting Methods
  Difficulty: Beginner
  Primary Concept: Core methods for extraction, replacement, case conversion, and formatting
*/

const longText = "Hello this is Abhishek Dhone";
console.log("length:", longText.length);

// slice(start, end)
console.log("slice(14, 27):", longText.slice(14, 27));

const word = "stringify";
console.log("slice(0, 5):", word.slice(0, 5));
console.log("slice(0, 1):", word.slice(0, 1));
console.log("slice(-3, -1):", word.slice(-3, -1));

// substring(start, end)
console.log("substring(10, 14):", longText.substring(10, 14));

// substr(start, length) is legacy but still seen in old code
console.log("substr(14, 8):", longText.substr(14, 8));

// replace and replaceAll patterns
const replaceText = "Please visit Microsoft at Microsoft.com";
console.log("replace first:", replaceText.replace("Microsoft", "W3Schools"));
console.log("replace all regex:", replaceText.replace(/Microsoft/g, "W3Schools"));

// case conversion
const upper = "Hello Friends!";
console.log("toUpperCase:", upper.toUpperCase());

const lower = "HELLO FRIENDS!";
console.log("toLowerCase:", lower.toLowerCase());

// concat and +
const part1 = "Great ";
const part2 = "Leaders";
console.log("concat:", part1.concat(part2));
console.log("plus:", part1 + part2);

// trim (string is immutable)
const spaced = "       Trim the space around me        ";
console.log("trim:", spaced.trim());
console.log("original still same:", spaced);

// padEnd
const base = "3 people have names";
console.log("padEnd:", base.padEnd(30, " xyz"));

// charAt and charCodeAt
const phrase = "I Love Coding";
console.log("charAt(4):", phrase.charAt(4));
console.log("charCodeAt(4):", phrase.charCodeAt(4));
console.log("index access [0]:", phrase[0]);

// split
const slashText = "a/b/c/d/e/f";
const letters = slashText.split("/");
console.log("split by '/':", letters);
console.log("third element:", letters[2]);

const sentence = "Hello! My Name is Abhishek Dhone and I am from Nashik";
const words = sentence.split(" ");
console.log("split by space:", words);
console.log("fifth word:", words[4]);

// valueOf for string object wrappers
const wrapped = new String("wrapped text");
console.log("valueOf:", wrapped.valueOf());

// Template literals for multiline formatting and inline expressions.
const lastNameA = "Dhone";
const lastNameB = "Soni";
const lastNameC = "Parekh";

const profileText = `Abhishek ${lastNameA} but
in MP they call me ${lastNameB} and
in GJ call me ${false ? "P" : lastNameC}`;

console.log("Template literal output:\n" + profileText);

// Basic template literal usage versus concatenation.
const traditionalGreeting = "Hello, " + "World!";
console.log(traditionalGreeting);

const templateGreeting = `Hello, World!`;
console.log(templateGreeting);

// String interpolation and expressions.
const name = "Alice";
const personAge = 25;
const traditionalIntroduction = "My name is " + name + " and I am " + personAge + " years old.";
console.log(traditionalIntroduction);

const templateIntroduction = `My name is ${name} and I am ${personAge} years old.`;
console.log(templateIntroduction);

const price = 10;
const taxRate = 0.05;
const total = `Total: $${price * (1 + taxRate)}`;
console.log(total);

// Multi-line template literals.
const traditionalAddress =
  "123 Main St.\n" +
  "Anytown, USA\n" +
  "12345";
console.log(traditionalAddress);

const templateAddress =
  `123 Main St.
Anytown, USA
12345`;
console.log(templateAddress);

// Nested template literals.
const orderUser = { id: 1, name: "John Doe" };
const item = { id: 2, name: "Widget", price: 9.99 };
const orderMessage = `Order Details:
User: ${orderUser.name} (ID: ${orderUser.id})
Item: ${item.name} (ID: ${item.id}, Price: $${item.price})`;
console.log(orderMessage);

// Tagged template literals.
function highlight(strings, ...values) {
  console.log("Strings:", strings);
  console.log("Values:", values);
  return "Processed String";
}

const quantity = 3;
const pricePerUnit = 5;
const taggedResult = highlight`You bought ${quantity} units at $${pricePerUnit} each.`;
console.log(taggedResult);

// Advanced expression interpolation.
function double(x) {
  return x * 2;
}

const number = 4;
const resultExpression = `Double of ${number} is ${double(number)}.`;
console.log(resultExpression);

// Conditional expressions inside template literals.
const isLoggedIn = true;
const userName = "Jane Doe";
const loginMessage = `User status: ${isLoggedIn ? `Logged in as ${userName}` : "Not logged in"}.`;
console.log(loginMessage);

// Template literals with array methods.
const fruitListSource = ["Apple", "Banana", "Cherry"];
const fruitList = `Fruits: ${fruitListSource.map((fruit) => fruit).join(", ")}.`;
console.log(fruitList);

// Escaping backticks inside template literals.
const codeSnippet = `Here's some code: \`${double.toString()}\``;
console.log(codeSnippet);

// Nested template literal with conditional branch.
const student = { name: "Emily", grade: 90 };
const studentInfo = `Student Info:
- Name: ${student.name}
- Grade: ${student.grade >= 90 ? `A (Score: ${student.grade})` : "B or below"}`;
console.log(studentInfo);

// Tagged template for custom formatting.
function style(strings, ...values) {
  let output = "";
  strings.forEach((string, index) => {
    output += `${string}${values[index] ? `<span style="color: red;">${values[index]}</span>` : ""}`;
  });
  return output;
}

const errorMessage = "Unexpected token";
const lineNumber = 10;
const styledMessage = style`Error: ${errorMessage} at line ${lineNumber}.`;
console.log(styledMessage);
