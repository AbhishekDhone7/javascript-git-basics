/*
  Topic: Object Iteration with for...in
  Difficulty: Beginner
  Primary Concept: Iterating object properties, including nested objects
*/

const person = {
  firstName: "Abhishek",
  lastName: "Dhone",
  contact: 8888888888,
  cars: ["Mustang", "Lamborghini", "Rolls Royce"],
  cities: {
    birth: "Shahada",
    livesIn: "Nashik",
    worksIn: "Pune",
    dream: "California"
  }
};

console.log("Top-level iteration:");
for (const key in person) {
  console.log(`Property: ${key} | Value: ${person[key]}`);
}

console.log("\nNested object-aware iteration:");
for (const key in person) {
  const value = person[key];

  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    console.log(`Nested object: ${key}`);

    for (const nestedKey in value) {
      console.log(`  ${nestedKey}: ${value[nestedKey]}`);
    }
  } else {
    console.log(`Property: ${key} | Value: ${value}`);
  }
}
