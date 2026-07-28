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
