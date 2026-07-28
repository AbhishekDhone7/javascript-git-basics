/*
  Topic: JavaScript interview question bank basics
  Difficulty: Beginner
  Primary Concept: Quick revision prompts and answer framing
*/

console.log("--- Interview question bank ---");

const questions = [
  {
    question: "What is the difference between var, let, and const?",
    answer: "var is function-scoped, let and const are block-scoped, and const cannot be reassigned.",
  },
  {
    question: "What is a closure?",
    answer: "A closure is when a function remembers variables from its outer lexical scope.",
  },
  {
    question: "What does Promise.all do?",
    answer: "It waits for all promises to fulfill and rejects as soon as one promise rejects.",
  },
];

questions.forEach((item, index) => {
  console.log(`${index + 1}. ${item.question}`);
  console.log(`   Answer: ${item.answer}`);
});

console.log("--- Notes ---");
console.log("Use short answers for screening rounds and deeper examples for follow-up interviews.");
