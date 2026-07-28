/*
  Topic: Implicit and Explicit Type Coercion
  Difficulty: Beginner
  Primary Concept: How JavaScript converts values between string, number, and boolean
*/

// 1) String coercion with +
const numberValue = 42;
const message = "The answer is: " + numberValue; // number -> string
console.log(message);

const boolMessage = "Value: " + true; // boolean -> string
console.log(boolMessage);

// 2) Number coercion
const stringNumber = "123";
const numberFromString = Number(stringNumber); // explicit
const numberFromUnaryPlus = +stringNumber; // explicit unary plus
console.log(numberFromString, numberFromUnaryPlus);

const booleanValue = true;
const numberFromBoolean = +booleanValue;
console.log(numberFromBoolean); // 1

// Arithmetic operators (except + with string) force number conversion when possible
const subtractionResult = "9" - 3;
console.log(subtractionResult); // 6

const invalidNumericResult = "true" - false;
console.log(invalidNumericResult); // NaN

// 3) Boolean coercion
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean("hello")); // true

// 4) Explicit conversion helpers
const explicitString = String(123);
const explicitNumber = Number("456");
const explicitBoolean = Boolean("hello");
console.log(explicitString, explicitNumber, explicitBoolean);

// Parsing strings
const parsedInt = parseInt("123.45", 10); // 123
const parsedFloat = parseFloat("456.78"); // 456.78
console.log(parsedInt, parsedFloat);
