/*
  Topic: Timers with setTimeout and setInterval
  Difficulty: Beginner
  Primary Concept: Scheduling delayed and repeated work with the browser/Node timer APIs
*/

console.log("--- Question 1: setTimeout ---");
setTimeout(() => {
  console.log("Hello, World!");
}, 3000);

console.log("I am normal console");

setTimeout(() => {
  console.log("This message appears after 2 seconds");
}, 2000);

console.log("--- setTimeout with arguments and clearTimeout ---");
const greetingTimeout = setTimeout((name) => {
  console.log(`Hello, ${name}!`);
}, 1500, "Alice");

const canceledTimeout = setTimeout(() => {
  console.log("This message will not show");
}, 3000);

clearTimeout(canceledTimeout);
console.log("Canceled timeout id:", typeof greetingTimeout);

let timeoutId = setTimeout(() => {
  console.log("This message 3 will not show");
}, 3000);

setTimeout(() => {
  console.log("This message 2 will show");
}, 2000);

setTimeout(() => {
  console.log("This message 1 will show");
}, 1000);

clearTimeout(timeoutId);

console.log("--- setTimeout scheduling note ---");
setTimeout(() => {
  console.log("This runs after the current script finishes.");
}, 0);

console.log("Main script keeps running while timers wait.");

console.log("--- Question 2: delayedLog ---");
function delayedLog(message, delay) {
  setTimeout(() => {
    console.log(message);
  }, delay);
}

delayedLog("Hello Swarupa", 1000);

console.log("--- Question 3: setInterval with stop ---");
let intervalCount = 0;
const helloInterval = setInterval(() => {
  console.log("Hello");
  intervalCount += 2;
  if (intervalCount >= 10) {
    clearInterval(helloInterval);
    console.log("Stopped after 10 seconds");
  }
}, 2000);

console.log("--- setInterval with arguments ---");
let repeatedCount = 0;
const repeatedMessageInterval = setInterval((text) => {
  console.log(text);
  repeatedCount++;
  if (repeatedCount >= 2) {
    clearInterval(repeatedMessageInterval);
  }
}, 2000, "Repeated message every 2 seconds");

console.log("--- Nested setTimeout example ---");
let nestedDelay = 50;

function nestedRequest() {
  console.log(`Nested timeout with delay ${nestedDelay}ms`);

  if (nestedDelay >= 200) {
    console.log("Nested timeout demo finished");
    return;
  }

  nestedDelay *= 2;
  setTimeout(nestedRequest, nestedDelay);
}

setTimeout(nestedRequest, nestedDelay);

console.log("--- Question 4: countdown ---");
function countdown(n) {
  let current = n;
  const countdownInterval = setInterval(() => {
    if (current > 0) {
      console.log(current);
      current--;
    } else {
      console.log("Done!");
      clearInterval(countdownInterval);
    }
  }, 1000);
}

countdown(5);

console.log("--- Question 5: Tick/Tock timer ---");
let tickTockCount = 0;
const tickTockInterval = setInterval(() => {
  if (tickTockCount < 5) {
    console.log("Tick");
    tickTockCount++;
  } else {
    console.log("Tock");
    clearInterval(tickTockInterval);
  }
}, 1000);

console.log("--- startTimer example ---");
function startTimer(duration) {
  let timer = duration;

  const timerInterval = setInterval(() => {
    const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");

    console.log(`${minutes}:${seconds}`);

    if (timer <= 0) {
      clearInterval(timerInterval);
      console.log("Timer completed!");
      return;
    }

    timer--;
  }, 1000);
}

startTimer(3);

console.log("--- 30-second timer note ---");
console.log("A 30-second countdown would use the same startTimer helper.");
// Example usage in real code: startTimer(30);

console.log("--- Callback passing patterns ---");
function plsWait(callback) {
  console.log("Inside asynchronous helper plsWait()");
  setTimeout(() => {
    callback("Abhishek");
  }, 100);
}

function callbackExample(name) {
  console.log(`Hello Mr. ${name}`);
}

setTimeout(() => {
  plsWait(callbackExample);
}, 100);

function plsWaitWithArgs(callback) {
  console.log("Inside asynchronous helper plsWaitWithArgs()");
  setTimeout(callback, 100, "Abhishek");
}

function callbackExampleWithArgs(name) {
  console.log(`Hello Mr. ${name}`);
}

setTimeout(plsWaitWithArgs, 100, callbackExampleWithArgs);

console.log("This line runs before the asynchronous callbacks complete.");

setTimeout(() => {
  console.log("1st");
}, 100);
setTimeout(() => {
  console.log("2nd");
}, 100);
setTimeout(() => {
  console.log("3rd");
}, 100);

setTimeout(() => {
  console.log("1st delayed call");
}, 100);
setTimeout(() => {
  console.log("2nd delayed call");
}, 200);
setTimeout(() => {
  console.log("3rd delayed call");
}, 300);

console.log("--- Notes ---");
// setTimeout schedules one delayed callback.
// setInterval repeats until clearInterval is called.
// clearTimeout cancels a pending timeout.
// Nested setTimeout is useful when the delay needs to adapt over time.
// These examples are intentionally kept simple to focus on timing behavior.
