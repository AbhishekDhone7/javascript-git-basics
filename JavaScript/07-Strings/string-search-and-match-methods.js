/*
  Topic: String Search and Match Methods
  Difficulty: Beginner
  Primary Concept: Finding text with index/search/match/includes/start/end checks
*/

const text = "Different Frameworks of JS are React JS, Node JS, Express JS, Vue JS, etc";

// indexOf and lastIndexOf
console.log("indexOf('JS'):", text.indexOf("JS"));
console.log("indexOf('JS', 35):", text.indexOf("JS", 35));
console.log("lastIndexOf('JS'):", text.lastIndexOf("JS"));

if (text.indexOf("JS") === text.lastIndexOf("JS")) {
  console.log("No repetition");
} else {
  console.log("Repeated occurrences");
}

// search
console.log("search('JS'):", text.search("JS"));

// match with regex
const matches = text.match(/JS/g);
console.log("match(/JS/g):", matches);
console.log(matches && matches.length === 1 ? "Single" : "Multiple");

// includes / startsWith / endsWith
console.log("includes('JS', 38):", text.includes("JS", 38));

const title = "Super Man or Women";
console.log("startsWith('Super'):", title.startsWith("Super"));
console.log("endsWith('Women'):", title.endsWith("Women"));

// localeCompare
console.log("localeCompare('apple' vs 'banana'):", "apple".localeCompare("banana"));
console.log("localeCompare('apple' vs 'apple'):", "apple".localeCompare("apple"));

// repeat
console.log("'JS '.repeat(3):", "JS ".repeat(3));
