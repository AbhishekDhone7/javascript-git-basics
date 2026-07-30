// java ->  multy thred
// 10000 -> 10000 threds -> server slow (16 gb)
// vedio proccesing
// image proccesing
// pdf generation


// Node -> single thred (background treads 10 we can use)
// 10000 -> async -> 1 -> callback -> 2 -> callback -> 3 (10 mb) 
// chat applications (websockets)
// foot delivery, game, booking
// streming 

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



async function logA() { 
    await console.log('A') 
}
function logB() { console.log('B') }
function logC() { console.log('C') }
function logD() { console.log('D') }

// Click the "RUN" button to learn how this works!
logA();
setTimeout(logB, 0);
Promise.resolve().then(logC);
logD();



async function getProducts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("Count:", data);
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

  const res = await fetch("https://jsonplaceholder.typicode.com/posts/id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authe" : "Bearer JWT"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const created = await res.json();
  console.log(created.id);
}