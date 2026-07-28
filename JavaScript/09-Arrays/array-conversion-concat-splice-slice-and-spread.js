/*
  Topic: Array Conversion, concat, splice, slice, and Spread
  Difficulty: Beginner
  Primary Concept: Choosing mutating vs non-mutating array operations
*/

const mernStack = ["HTML", "CSS", "JAVASCRIPT", "REACT JS", "NODE JS", "MATERIAL UI"];
console.log("Original array:", mernStack);

// toString converts array output to a comma-separated string.
const asString = mernStack.toString();
console.log("toString output:", asString);
console.log("Original after toString:", mernStack); // unchanged

// join lets us choose a custom separator.
const joinedWithStar = mernStack.join("*");
const joinedWithoutSeparator = mernStack.join("");
console.log("join('*') output:", joinedWithStar);
console.log("join('') output:", joinedWithoutSeparator);

// concat returns a new array and does not mutate the source arrays.
const dataScience = ["Python", "PowerBI", "NLP"];
const mergedWithConcat = mernStack.concat(dataScience);
console.log("concat result:", mergedWithConcat);
console.log("Original after concat:", mernStack);

// Spread syntax is a modern alternative to concat.
const mergedWithSpread = [...mernStack, ...dataScience];
console.log("Spread merge result:", mergedWithSpread);

// splice mutates the original array.
const brandsForSplice = ["Apple", "OnePlus", "Samsung", "MI", "Vivo", "Realme"];
console.log("Before splice:", brandsForSplice);

brandsForSplice.splice(3, 0, "Motorola", "Spark");
console.log("After insert splice:", brandsForSplice);

const removedBySplice = brandsForSplice.splice(1, 3);
console.log("Removed by splice:", removedBySplice);
console.log("After remove splice:", brandsForSplice);

// slice returns a new array and does not mutate the source array.
const brandsForSlice = ["Apple", "OnePlus", "Samsung", "MI", "Vivo", "Realme"];
console.log("slice(1):", brandsForSlice.slice(1));
console.log("slice(1, 3):", brandsForSlice.slice(1, 3));
console.log("slice(-1):", brandsForSlice.slice(-1));
console.log("slice(-3, -2):", brandsForSlice.slice(-3, -2));
console.log("Original after slice:", brandsForSlice);
