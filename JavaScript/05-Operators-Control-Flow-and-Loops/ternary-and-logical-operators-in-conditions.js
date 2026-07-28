/*
  Topic: Ternary and Logical Operators in Conditions
  Difficulty: Beginner
  Primary Concept: Concise conditions and combining checks with && and ||
*/

// Example 1A: Without ternary
const isRain = true;
if (isRain) {
  console.log("Raining");
} else {
  console.log("Not Raining");
}

// Example 1B: With ternary
const isRaining = true;
const weatherMessage = isRaining ? "Bring an umbrella" : "Enjoy the weather";
console.log(weatherMessage);

// Example 2: Logical AND
const isLoggedIn = true;
const isAdmin = false;

if (isLoggedIn && isAdmin) {
  console.log("You are logged in as an admin.");
} else {
  console.log("Access denied.");
}

// Example 3: Logical OR
const isGuest = false;
const isVip = true;

if (isGuest || isVip) {
  console.log("Welcome to the event!");
} else {
  console.log("Access denied.");
}

// Example 4: Ternary used for message selection
const isUserLoggedIn = true;
const message = isUserLoggedIn
  ? "Welcome, User!"
  : "Please log in to continue";
console.log(message);

// Logical operators return values, not always booleans.
console.log("hello" && 123); // 123 (first falsy or last truthy)
console.log("" || "fallback"); // fallback (first truthy)
