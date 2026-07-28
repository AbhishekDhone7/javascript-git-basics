/*
  Topic: Map Patterns and Operations
  Difficulty: Beginner to Intermediate
  Primary Concept: Using Map for keyed data, insertion order, and non-string keys
*/

// Create a Map from key-value pairs.
const familyAges = new Map([
  ["my_age", 18],
  ["father", 49],
  ["mother", 42],
]);

console.log("Initial Map:", familyAges);

// Add and update values with set().
familyAges.set("sister", 15);
familyAges.set("my_age", 19);
console.log("After set():", familyAges);
console.log("my_age via get():", familyAges.get("my_age"));
console.log("father via get():", familyAges.get("father"));

// Wrong access patterns for Map.
console.log("Bracket access:", familyAges["my_age"]);
console.log("Dot access:", familyAges.my_age);
console.log("Numeric access:", familyAges[0]);

// size, has, delete.
console.log("Map size:", familyAges.size);
console.log("Has my_age?", familyAges.has("my_age"));
console.log("Has sister?", familyAges.has("sister"));
familyAges.delete("sister");
console.log("After delete(sister):", familyAges);

// forEach iterates value, key, map.
let forEachOutput = "";
familyAges.forEach(function (value, key) {
  forEachOutput += `${key} = ${value} | `;
});
console.log("forEach output:", forEachOutput);

// entries(), keys(), values().
console.log("entries():", [...familyAges.entries()]);
console.log("keys():", [...familyAges.keys()]);
console.log("values():", [...familyAges.values()]);

for (const [key, value] of familyAges) {
  console.log(`${key}: ${value}`);
}

// Convert Map to array.
const keyValueArray = [...familyAges];
console.log("Map to array:", keyValueArray);

// Map keys can be any type.
const mapMethod = function () {
  console.log("Inside the map method");
};

const anyKeyMap = new Map();
const objectKey = { id: 1 };
const functionKey = function () {};

anyKeyMap.set(1, "number key");
anyKeyMap.set(objectKey, "object key");
anyKeyMap.set(functionKey, "function key");
anyKeyMap.set("mapMethod", mapMethod);

console.log("Number key:", anyKeyMap.get(1));
console.log("Object key:", anyKeyMap.get(objectKey));
console.log("Function key:", anyKeyMap.get(functionKey));
anyKeyMap.get("mapMethod")();

// Object identity matters for object keys.
console.log("Fresh object lookup:", anyKeyMap.get({ id: 1 }));

// Map.clear() removes everything.
const tempMap = new Map([
  ["a", 1],
  ["b", 2],
]);
tempMap.clear();
console.log("Cleared map size:", tempMap.size);

// Map vs Object note.
const objectLike = { my_age: 19, father: 49 };
console.log("Object keys:", Object.keys(objectLike));
console.log("Map preserves insertion order and supports any key type.");
