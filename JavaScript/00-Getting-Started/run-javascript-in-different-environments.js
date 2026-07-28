/*
  Topic: Different Ways to Run JavaScript Programs
  Difficulty: Beginner
  Primary Concept: Execution environments for JavaScript

  This file summarizes common ways to run JavaScript and prints
  practical steps for each approach.
*/

const runMethods = [
  {
    name: "Browser Console (REPL)",
    howToRun: "Open DevTools (F12) -> Console tab -> run code directly.",
    quickExample: "console.log('Hello, Browser Console!');"
  },
  {
    name: "HTML <script> Tag",
    howToRun: "Add a <script> tag inside an HTML file and open it in a browser.",
    quickExample: "<script>console.log('Hello, HTML Script!');</script>"
  },
  {
    name: "External Script File",
    howToRun: "Link script.js with <script src='script.js' defer></script>.",
    quickExample: "console.log('Hello, External Script!');"
  },
  {
    name: "Node.js REPL",
    howToRun: "Run `node` in terminal, then type JavaScript statements.",
    quickExample: "console.log('Hello, REPL!');"
  },
  {
    name: "Node.js Script via IDE/Terminal",
    howToRun: "Save program.js, then run `node program.js`.",
    quickExample: "console.log('Hello, Node.js!');"
  },
  {
    name: "Online Code Editors",
    howToRun: "Use CodePen, JSFiddle, or Replit to run JavaScript in the browser.",
    quickExample: "Create a project and write JavaScript in the JS panel."
  },
  {
    name: "Browser Extensions",
    howToRun: "Use extension-based JavaScript injectors for specific websites.",
    quickExample: "Run custom DOM scripts only where needed."
  },
  {
    name: "Server-Side with Node.js",
    howToRun: "Create server file and run it with `node server.js`.",
    quickExample: "See ../25-Nodejs-Fundamentals/basic-http-server-commonjs.js"
  }
];

function printMethods(methods) {
  console.log("Different Ways to Run JavaScript Programs\n");

  methods.forEach((method, index) => {
    console.log(`${index + 1}. ${method.name}`);
    console.log(`   How to run: ${method.howToRun}`);
    console.log(`   Example: ${method.quickExample}\n`);
  });
}

printMethods(runMethods);
