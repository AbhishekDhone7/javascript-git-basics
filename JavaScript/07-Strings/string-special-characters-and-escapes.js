/*
  Topic: String Special Characters and Escape Sequences
  Difficulty: Beginner
  Primary Concept: Using escape sequences in text output
*/

console.log("Line 1\nLine 2");
console.log("Windows new line style uses \\r\\n in files");

console.log("Single quote: \'");
console.log("Double quote: \"");
console.log("Backtick: \`");
console.log("Backslash: \\\\");

console.log("Tab between values:\tA\tB\tC");

// Rare legacy escapes (for awareness)
console.log("Backspace demo: ABC\bD");
console.log("Form feed demo: A\fB");
console.log("Vertical tab demo: A\vB");

// String.fromCharCode creates text from unicode values
console.log("String.fromCharCode(65, 66, 67):", String.fromCharCode(65, 66, 67));
