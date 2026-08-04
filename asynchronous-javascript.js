// Java -> multithreaded
// 10000 -> 10000 threads -> server slow (16 GB)
// video processing
// image processing
// pdf generation


// Node -> single thread (background threads can be used)
// 10000 -> async -> 1 -> callback -> 2 -> callback -> 3 (10 mb) 
// chat applications (websockets)
// food delivery, games, booking
// streaming

// Results -> 1 <- 3 ,- 2





// const fs = require("fs"); // File read does every time
// console.log("Start");
// setTimeout(() => console.log("setTimeout"), 0);
// setImmediate(() => console.log("setImmediate"));
// process.nextTick(() => console.log("nextTick"));
// Promise.resolve().then(() => console.log("Promise"));
// fs.readFile(__filename, () => {
//   console.log("File Read");
// });
// console.log("End");


// console.log
// .nextTick
// promise.log
// setTimeout
// setImmediate
// fs



async function logAwaitedA() { 
    await console.log('A') 
}
function logTimerB() { console.log('B') }
function logPromiseC() { console.log('C') }
function logSynchronousD() { console.log('D') }

// Click the "RUN" button to learn how this works!
logAwaitedA();
setTimeout(logTimerB, 0);
Promise.resolve().then(logPromiseC);
logSynchronousD();



async function getProducts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const products = await response.json();
    console.log("Products:", products);
  } catch (error) {
    console.log("Request failed:", error.message);
  }
}

getProducts();




async function createPost() {
  const payload = {
    title: "Notebook",
    body: "Premium quality",
    userId: 1
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer JWT"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const createdPost = await response.json();
  console.log(createdPost.id);
}