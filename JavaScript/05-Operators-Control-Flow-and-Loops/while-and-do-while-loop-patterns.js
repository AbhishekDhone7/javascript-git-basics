/*
  Topic: while and do-while Loop Patterns
  Difficulty: Beginner
  Primary Concept: Difference between pre-check and post-check loops
*/

// 1) Basic while loop
let i = 1;
while (i <= 5) {
  console.log("While iteration", i);
  i++;
}

// 2) Basic do-while loop
let j = 1;
do {
  console.log("Do-while iteration", j);
  j++;
} while (j <= 5);

// 3) Looping over an array with while
const fruits = ["apple", "banana", "orange"];
let fruitIndex = 0;
while (fruitIndex < fruits.length) {
  console.log("Fruit at index", fruitIndex, "is", fruits[fruitIndex]);
  fruitIndex++;
}

// 4) Looping over an array with do-while
const vegetables = ["carrot", "broccoli", "spinach"];
let vegetableIndex = 0;
do {
  console.log("Vegetable at index", vegetableIndex, "is", vegetables[vegetableIndex]);
  vegetableIndex++;
} while (vegetableIndex < vegetables.length);

// 5) while vs do-while when condition is false initially
let x = 1;
while (x > 1) {
  console.log("This will not run");
}
console.log("While loop finished.");

let y = 1;
do {
  console.log("This runs at least once:", y + 1);
} while (y > 1);
console.log("Do-while loop finished.");
