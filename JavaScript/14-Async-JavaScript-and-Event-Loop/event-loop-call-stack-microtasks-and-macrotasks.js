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
