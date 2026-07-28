/*
  Topic: Array Advanced Methods (sort, fill, flat, Array.of)
  Difficulty: Intermediate
  Primary Concept: Ordering, shaping, and flattening array data safely
*/

// sort() mutates the original array.
const names = ["Abhi", "Sachin", "Rushi", "Tushar", "Rohit", "Satish"];
names.sort();
console.log("Sorted names:", names);

const numbers = [23, 464, 74, 1, 37, 87, 99, 352];
console.log("Default numeric sort (lexicographic):", [...numbers].sort());

const ascending = [...numbers].sort(function ascendingComparator(a, b) {
  return a - b;
});
console.log("Numeric ascending sort:", ascending);

const descending = [...numbers].sort(function descendingComparator(a, b) {
  return b - a;
});
console.log("Numeric descending sort:", descending);

// localeCompare is useful when sorting object properties with strings.
const people = [
  { name: "Tushar" },
  { name: "Atul" },
  { name: "Rohit" },
  { name: "Vinay" },
  { name: "Abhi" },
];

people.sort(function sortByName(a, b) {
  return a.name.localeCompare(b.name);
});
console.log("Sorted objects by name:", people);

// Array.of creates arrays from arguments.
const createdWithArrayOf = Array.of(1, 2, 3, 4, 5, 6, 7, 8);
console.log("Array.of output:", createdWithArrayOf);

// fill(value, start, end) mutates selected range.
const sparseLike = [1, 2, 3];
sparseLike[10] = 10;
console.log("Before fill:", sparseLike);

sparseLike.fill(4, 3, 10);
console.log("After fill(4, 3, 10):", sparseLike);

// flat(depth) flattens nested arrays.
const nestedSimple = [1, 2, [3, 4]];
console.log("flat() simple:", nestedSimple.flat());

const nestedDeep = [1, 2, [[[[3, 4]]]]];
console.log("flat(Infinity) deep:", nestedDeep.flat(Infinity));
