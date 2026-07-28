/*
  Topic: JavaScript Engines and V8 Pipeline
  Difficulty: Intermediate
  Related Topics:
  - 02-Runtime-and-Execution-Context
  - 23-Performance-and-Optimization

  This file introduces JavaScript engines and explains how V8 executes code.
*/

const javascriptEngines = [
  {
    name: "V8",
    browsers: ["Chrome", "Edge"],
    note: "Known for strong optimization and performance."
  },
  {
    name: "SpiderMonkey",
    browsers: ["Firefox"],
    note: "Mozilla's JavaScript engine."
  },
  {
    name: "Chakra",
    browsers: ["Legacy Internet Explorer"],
    note: "Historical engine in older Microsoft browser stacks."
  }
];

const v8PipelineSteps = [
  "Source code enters V8.",
  "Parser builds an Abstract Syntax Tree (AST).",
  "Ignition interprets bytecode for fast startup.",
  "Hot code paths are identified during execution.",
  "TurboFan optimizes hot paths into efficient machine code.",
  "Runtime profiling continues and may trigger re-optimization.",
  "Memory is managed with garbage collection.",
  "Hidden classes help optimize object property access."
];

function printEngine(engine) {
  console.log(`\nEngine: ${engine.name}`);
  console.log(`Browsers: ${engine.browsers.join(", ")}`);
  console.log(`Note: ${engine.note}`);
}

function printPipeline(title, steps) {
  console.log(`\n${title}`);
  steps.forEach((step, index) => {
    console.log(`${index + 1}. ${step}`);
  });
}

console.log("JavaScript Engines Overview");
javascriptEngines.forEach(printEngine);

printPipeline("V8 Execution Pipeline", v8PipelineSteps);
