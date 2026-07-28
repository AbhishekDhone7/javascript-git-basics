/*
  Topic: IIFE (Immediately Invoked Function Expression)
  Difficulty: Intermediate
  Primary Concept: Execute a function immediately and keep variables private
*/

// Historically, IIFEs were used to create private scope when var was common.
// A function declaration cannot be invoked immediately in this form:
// function go() {
//   console.log("Hi");
// }(); // SyntaxError
//
// Wrapping it as an expression makes immediate invocation valid.

(function () {
  const message = "Hey guys, what's up!";
  console.log(message);
})();

// Parentheses around the function expression.
(function () {
  console.log("Parentheses around the function");
})();

// Parentheses around the whole IIFE.
(function () {
  console.log("Parentheses around the whole function expression");
}());

!function () {
  console.log("Bitwise NOT style starter for IIFE expression context");
}();

+function () {
  console.log("Unary plus style starter for IIFE expression context");
}();
