/*
  Topic: DOM selection, events, and delegation basics
  Difficulty: Beginner
  Primary Concept: Reading user actions from the DOM and handling them safely
*/

console.log("--- DOM and events basics ---");

if (typeof document !== "undefined") {
  const message = document.createElement("p");
  message.textContent = "DOM lesson loaded";
  document.body.appendChild(message);

  document.body.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }

    console.log("Delegated click from:", button.textContent);
  });

  console.log("DOM APIs are available in this runtime.");
} else {
  console.log("DOM APIs are not available in Node, so this file documents the browser patterns instead.");
}

console.log("--- Notes ---");
console.log("Use querySelector for selection, addEventListener for events, and delegation for dynamic content.");
