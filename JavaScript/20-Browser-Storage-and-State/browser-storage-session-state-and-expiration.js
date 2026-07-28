/*
  Topic: Browser storage and state basics
  Difficulty: Beginner
  Primary Concept: Persisting small client-side data safely
*/

console.log("--- Browser storage and state basics ---");

function createStateSnapshot(userName, theme) {
  return {
    userName,
    theme,
    savedAt: new Date().toISOString(),
    expiresInMinutes: 30,
  };
}

const snapshot = createStateSnapshot("Abhishek", "dark");
console.log("State snapshot:", snapshot);

if (typeof localStorage !== "undefined") {
  localStorage.setItem("user-preference-state", JSON.stringify(snapshot));
  const restored = JSON.parse(localStorage.getItem("user-preference-state"));
  console.log("Restored from localStorage:", restored);
} else {
  console.log("localStorage is not available in Node, so the example stays as a state model here.");
}

console.log("--- Notes ---");
console.log("Use localStorage for simple persistence, sessionStorage for tab-scoped data, and always store JSON carefully.");
