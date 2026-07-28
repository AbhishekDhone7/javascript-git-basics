/*
  Topic: Coding exercises basics
  Difficulty: Beginner
  Primary Concept: Practicing common problem patterns
*/

console.log("--- Coding exercises basics ---");

function reverseString(value) {
  return value.split("").reverse().join("");
}

function countVowels(value) {
  return (value.match(/[aeiou]/gi) || []).length;
}

function findMax(values) {
  return Math.max(...values);
}

console.log("Reverse string:", reverseString("javascript"));
console.log("Vowel count:", countVowels("education"));
console.log("Max value:", findMax([3, 9, 2, 11, 4]));

console.log("--- Practice idea ---");
console.log("Try rewriting each function without built-in helpers, then compare readability and speed.");
