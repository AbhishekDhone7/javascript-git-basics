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
for (const propertyName in person) {
  console.log(`Property: ${propertyName} | Value: ${person[propertyName]}`);
}

console.log("\nNested object-aware iteration:");
for (const propertyName in person) {
  const value = person[propertyName];

  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    console.log(`Nested object: ${propertyName}`);

    for (const nestedKey in value) {
      console.log(`  ${nestedKey}: ${value[nestedKey]}`);
    }
  } else {
    console.log(`Property: ${propertyName} | Value: ${value}`);
  }
}
