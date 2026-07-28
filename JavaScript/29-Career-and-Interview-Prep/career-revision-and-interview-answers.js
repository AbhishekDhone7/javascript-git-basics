/*
  Topic: Career and interview prep basics
  Difficulty: Beginner
  Primary Concept: Structuring answers and keeping a revision routine
*/

console.log("--- Career and interview prep basics ---");

function starAnswer(situation, task, action, result) {
  return {
    situation,
    task,
    action,
    result,
  };
}

console.log(
  "STAR answer:",
  starAnswer(
    "A bug broke checkout",
    "Restore payment flow",
    "Found a race condition and added a guard",
    "Checkout worked reliably again"
  )
);

const revisionChecklist = [
  "Review one topic per day",
  "Write one explanation from memory",
  "Solve one coding exercise",
  "Record one mistake or insight",
];

revisionChecklist.forEach((item) => console.log(item));

console.log("--- Notes ---");
console.log("Good interview prep combines concepts, examples, and a repeatable revision habit.");
