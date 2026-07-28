/*
  Topic: JavaScript Foundations Overview
  Difficulty: Beginner
  Related Topics:
  - 02-Runtime-and-Execution-Context
  - 14-Async-JavaScript-and-Event-Loop

  This file explains what JavaScript is, why it is called JavaScript,
  where it runs, and what browser JavaScript can and cannot do.
*/

const javascriptFoundations = {
  definition:
    "JavaScript is a synchronous, high-level, multi-paradigm scripting language used to make web pages and apps interactive.",
  purpose: "JavaScript was created to make web pages dynamic and interactive.",
  history: {
    creator: "Brendan Eich",
    initialName: "LiveScript",
    renamedTo: "JavaScript",
    note: "It evolved independently and follows the ECMAScript specification."
  },
  standards: {
    ecma262: "https://262.ecma-international.org/",
    mdnReference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
  },
  environments: ["Browser", "Node.js (server)", "Mobile/desktop via frameworks"],
  browserCapabilities: [
    "Manipulate HTML and CSS",
    "Handle user events",
    "Make network requests (Fetch/AJAX)",
    "Work with cookies and local storage"
  ],
  browserLimitations: [
    "No direct low-level CPU or memory access",
    "No unrestricted file system or device access without permission",
    "Restricted by Same-Origin Policy (with controlled exceptions like CORS)",
    "Limited cross-tab and cross-window interaction"
  ],
  uniqueness: [
    "Integrated with HTML and CSS",
    "Beginner-friendly syntax for simple tasks",
    "Supported by all major browsers by default"
  ],
  transpiledLanguages: [
    "TypeScript",
    "Flow",
    "CoffeeScript",
    "Dart",
    "Kotlin",
    "Brython"
  ]
};

function printSection(title, items) {
  console.log(`\n${title}`);
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
}

console.log("JavaScript Foundations Overview");
console.log(`Definition: ${javascriptFoundations.definition}`);
console.log(`Purpose: ${javascriptFoundations.purpose}`);
console.log(
  `History: Created by ${javascriptFoundations.history.creator}, initially called ${javascriptFoundations.history.initialName}.`
);
console.log(`Standards: ${javascriptFoundations.standards.ecma262}`);
console.log(`Reference: ${javascriptFoundations.standards.mdnReference}`);

printSection("Where JavaScript Runs", javascriptFoundations.environments);
printSection("What In-Browser JavaScript Can Do", javascriptFoundations.browserCapabilities);
printSection("What In-Browser JavaScript Cannot Do", javascriptFoundations.browserLimitations);
printSection("What Makes JavaScript Unique", javascriptFoundations.uniqueness);
printSection("Languages That Transpile to JavaScript", javascriptFoundations.transpiledLanguages);
