/*
  Topic: Equality and Comparison Coercion
  Difficulty: Beginner
  Primary Concept: Difference between loose and strict checks, and comparison coercion
*/

// == checks value after coercion when needed.
const looseEquality1 = 5 == "5";
const looseEquality2 = null == undefined;
const looseEquality3 = "0" == false;
console.log("Loose equality:", looseEquality1, looseEquality2, looseEquality3); // true true true

// === checks value and type with no coercion.
const strictEquality1 = 5 === "5";
const strictEquality2 = null === undefined;
const strictEquality3 = "0" === false;
console.log("Strict equality:", strictEquality1, strictEquality2, strictEquality3); // false false false

const looseInequality = "5" != 5;
const strictInequality = "5" !== 5;
console.log("Inequality:", looseInequality, strictInequality); // false true

// Special cases with undefined and null
const specialCase1 = undefined == false;
const specialCase2 = undefined === false;
const specialCase3 = null == false;
const specialCase4 = null === false;
const specialCase5 = "" == 0;
const specialCase6 = "" === 0;
console.log("Special cases:", specialCase1, specialCase2, specialCase3, specialCase4, specialCase5, specialCase6);

if (undefined) {
  console.log("undefined is truthy");
} else {
  console.log("undefined is falsy");
}

// null comparison gotcha with relational operators
console.log("null > 0:", null > 0); // false
console.log("null < 0:", null < 0); // false
console.log("null >= 0:", null >= 0); // true

// Comparison operators coerce numeric-looking strings to numbers
const greaterThan = "10" > 5;
const lessThanOrEqual = "5" <= 5;
console.log("Relational coercion:", greaterThan, lessThanOrEqual); // true true

// + with string concatenates, while - tries numeric conversion
const addAsString = "5" + 3;
const subtractAsNumber = "9" - 3;
console.log("Operator coercion:", addAsString, subtractAsNumber); // 53 6

// Logical operators return one of the operands (not always true/false)
const andOperator = "text" && true;
const orOperator = "" || false;
console.log("Logical returns:", andOperator, orOperator);

// Objects and arrays compare by reference, not by content.
const obj1 = { name: "John" };
const obj2 = { name: "John" };
console.log("Object reference compare (==):", obj1 == obj2); // false

const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
console.log("Array reference compare (===):", arr1 === arr2); // false

const emptyArrayA = [];
const emptyArrayB = [];
console.log("Empty arrays reference compare:", emptyArrayA === emptyArrayB); // false

const emptyArrayLooseNumber = [] == 0;
const emptyArrayLooseString = [] == "";
const emptyArrayStrictNumber = [] === 0;
const emptyArrayStrictString = [] === "";
console.log(
  "Empty array coercion:",
  emptyArrayLooseNumber,
  emptyArrayLooseString,
  emptyArrayStrictNumber,
  emptyArrayStrictString
);

const sameReferenceArraySource = [1, 2, 3];
const sameReferenceArrayCopy = sameReferenceArraySource;
console.log("Same array reference (===):", sameReferenceArraySource === sameReferenceArrayCopy); // true

const differentReferenceArray = [1, 2, 3];
console.log("Different array reference (==):", sameReferenceArraySource == differentReferenceArray); // false
console.log("Different array reference (===):", sameReferenceArraySource === differentReferenceArray); // false
