/*
  Topic: IIFE (Immediately Invoked Function Expression)
  Difficulty: Intermediate
  Primary Concept: Execute a function immediately and keep variables private
*/

(function () {
  const message = "Hey guys, what's up!";
  console.log(message);
})();

(function () {
  console.log("Parentheses around the whole function expression");
}());

!function () {
  console.log("Bitwise NOT style starter for IIFE expression context");
}();

+function () {
  console.log("Unary plus style starter for IIFE expression context");
}();
