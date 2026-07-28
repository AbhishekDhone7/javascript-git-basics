/*
  Topic: Event Loop, Call Stack, Microtasks, and Macrotasks
  Difficulty: Intermediate
  Primary Concept: How synchronous code, promise callbacks, and timers are scheduled
*/

console.log("--- Synchronous code runs first ---");
console.log("Start");

setTimeout(function timer() {
  console.log("Timer callback");
}, 0);

Promise.resolve().then(function promiseCallback() {
  console.log("Promise callback");
});

queueMicrotask(function microtaskCallback() {
  console.log("queueMicrotask callback");
});

console.log("End");

console.log("--- Nested execution order ---");
function outer() {
  console.log("outer start");

  function inner() {
    console.log("inner execution");
  }

  inner();
  console.log("outer end");
}

outer();

console.log("--- Timers versus microtasks ---");
setTimeout(() => {
  console.log("setTimeout callback after the current stack clears");
}, 10);

Promise.resolve().then(() => {
  console.log("microtask runs before macrotasks");
});

console.log("Main thread continues");

console.log("--- Async function example ---");
async function asyncFlow() {
  console.log("async flow start");
  await Promise.resolve();
  console.log("async flow after await");
}

asyncFlow();
console.log("after calling asyncFlow");

console.log("--- Multiple timers and order ---");
setTimeout(() => {
  console.log("timeout A");
}, 0);

setTimeout(() => {
  console.log("timeout B");
}, 0);

Promise.resolve().then(() => {
  console.log("promise inside main script");
});

console.log("--- queueMicrotask versus setTimeout ---");
queueMicrotask(() => {
  console.log("microtask 2");
});

setTimeout(() => {
  console.log("timeout C");
}, 0);

console.log("--- Notes ---");
// JavaScript is single-threaded for the main call stack.
// Promise callbacks and queueMicrotask callbacks go to the microtask queue.
// setTimeout callbacks go to the macrotask/callback queue.
// The event loop drains microtasks before it picks the next macrotask.
// Rendering is a browser concern; this Node-friendly example focuses on ordering only.

console.log("--- Async behavior notes ---");
console.log("JavaScript is synchronous by default, but Web APIs make common operations non-blocking.");
console.log("The browser or runtime hosts timers, fetch, storage, and DOM-related APIs.");
console.log("The main call stack processes one thing at a time.");

console.log("--- Web API and queue model ---");
console.log("setTimeout and fetch start in the host environment, then their callbacks are queued later.");
console.log("Promise callbacks enter the microtask queue.");
console.log("MutationObserver callbacks also enter the microtask queue.");
console.log("The callback/macrotask queue waits until the current stack and microtasks are empty.");

console.log("--- Rendering note ---");
console.log("Rendering is browser-specific and happens between event-loop turns when the DOM or styles change.");
console.log("If the call stack and microtask queue stay busy for too long, rendering can feel blocked.");

console.log("--- Starvation note ---");
console.log("If the microtask queue keeps getting new work, macrotasks may wait a long time.");

console.log("--- Visualizer tip ---");
console.log("Tools like Loupe or JSV9000 can help visualize the call stack and queues.");
