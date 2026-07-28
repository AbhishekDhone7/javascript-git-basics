/*
  Topic: for Loop Patterns, break, and continue
  Difficulty: Beginner
  Primary Concept: Common for-loop usage and control flow modifiers
*/

// 1) Basic for loop
for (let i = 1; i <= 5; i++) {
  console.log("Iteration", i);
}

// 2) Looping over an array by index
const colors = ["red", "green", "blue"];
for (let i = 0; i < colors.length; i++) {
  console.log("Color at index", i, "is", colors[i]);
}

// 3) Nested for loop (small multiplication table)
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} * ${j} = ${i * j}`);
  }
}

// 4) continue to skip even numbers
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;
  }
  console.log("Odd number:", i);
}

// 5) break to stop once target is found
const targetNumber = 4;
for (let i = 1; i <= 5; i++) {
  console.log("Checking number:", i);
  if (i === targetNumber) {
    console.log("Target number found!");
    break;
  }
}

// 6) for loop with omitted parts
let counter = 1;
for (; counter < 5; ) {
  console.log("Custom for syntax counter:", counter);
  counter++;
}
