/*
  Topic: Promises and async/await basics
  Difficulty: Intermediate
  Primary Concept: Representing future values and writing async code that reads top-to-bottom
*/

console.log("--- Promise concept notes ---");
// A promise represents the eventual completion or failure of an asynchronous operation.
// It has an internal state: pending -> fulfilled or rejected.
// It also has an internal result: undefined -> value or error.

console.log("--- Executor and settle once ---");
const settleOnce = new Promise((resolve, reject) => {
  console.log("Executor runs immediately");
  resolve("done");
  reject(new Error("ignored rejection"));
  setTimeout(() => resolve("ignored timeout"), 10);
});

settleOnce.then((value) => {
  console.log("Settle once value:", value);
});

console.log("--- Promise.resolve and Promise.reject ---");
Promise.resolve(42).then((value) => {
  console.log("Resolved immediately:", value);
});

Promise.reject(new Error("Rejected immediately"))
  .catch((error) => {
    console.log("Rejected immediately:", error.message);
  });

console.log("--- Promise basics ---");
const myPromise = new Promise((resolve, reject) => {
  const condition = true;

  if (condition) {
    resolve("Promise resolved successfully!");
  } else {
    reject("Promise rejected.");
  }
});

myPromise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });

console.log("--- then with resolve and reject handlers ---");
const branchPromise = new Promise((resolve) => {
  resolve("Branch resolved");
});

branchPromise.then(
  (value) => {
    console.log("then success handler:", value);
  },
  (error) => {
    console.log("then reject handler:", error);
  }
);

console.log("--- catch is then(null, handler) ---");
Promise.reject(new Error("Catch example"))
  .then(null, (error) => {
    console.log("then reject handler:", error.message);
  });

Promise.reject(new Error("Catch alias example"))
  .catch((error) => {
    console.log("catch handler:", error.message);
  });

console.log("--- finally cleanup ---");
Promise.resolve("Cleanup after success")
  .finally(() => {
    console.log("finally runs on success");
  })
  .then((value) => {
    console.log(value);
  });

Promise.reject(new Error("Cleanup after failure"))
  .finally(() => {
    console.log("finally runs on failure");
  })
  .catch((error) => {
    console.log(error.message);
  });

console.log("--- settled promises still run handlers ---");
const alreadySettled = Promise.resolve("Already settled");
setTimeout(() => {
  alreadySettled.then((value) => {
    console.log(value);
  });
}, 0);

console.log("--- Promise resolve/reject with delay ---");
function delayedPromise(message, shouldResolve, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(message);
      } else {
        reject(new Error(message));
      }
    }, delay);
  });
}

delayedPromise("Delayed success", true, 100)
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error.message);
  });

console.log("--- Immediate resolve from cache-style logic ---");
function getCachedValue(hasCache) {
  if (hasCache) {
    return Promise.resolve("Cached value");
  }

  return delayedPromise("Loaded value", true, 50);
}

getCachedValue(true).then((value) => {
  console.log(value);
});

console.log("--- Promise chaining ---");
Promise.resolve(2)
  .then((value) => value * 3)
  .then((value) => value + 4)
  .then((value) => {
    console.log("Chained result:", value);
  });

console.log("--- Broken chain note ---");
function job() {
  return Promise.resolve("job done");
}

function job2() {
  return Promise.resolve("job2 done");
}

job()
  .then(() => {
    return job2();
  })
  .then((value) => {
    console.log(value);
  });

console.log("--- Promise chaining ---");
console.log("--- Promise combinators ---");
const promiseA = Promise.resolve("A");
const promiseB = Promise.resolve("B");
const promiseC = new Promise((resolve) => setTimeout(() => resolve("C"), 50));

Promise.all([promiseA, promiseB, promiseC]).then((values) => {
  console.log("Promise.all:", values);
});

Promise.race([promiseB, promiseC]).then((value) => {
  console.log("Promise.race:", value);
});

Promise.allSettled([
  Promise.resolve("ok"),
  Promise.reject(new Error("fail")),
]).then((results) => {
  console.log("Promise.allSettled:", results.map((result) => result.status));
});

Promise.any([
  Promise.reject(new Error("first")),
  Promise.resolve("any success"),
]).then((value) => {
  console.log("Promise.any:", value);
});

console.log("--- async/await ---");
async function fetchData() {
  try {
    const response = await delayedPromise("Fetched data", true, 100);
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

fetchData();

console.log("--- async/await with failure handling ---");
async function fetchDataWithFailure() {
  try {
    const response = await delayedPromise("Network failure", false, 100);
    console.log(response);
  } catch (error) {
    console.log("Caught in async function:", error.message);
  }
}

fetchDataWithFailure();

console.log("--- async function returns a Promise ---");
async function returnValue() {
  return 42;
}

returnValue().then((value) => {
  console.log("async return value:", value);
});

console.log("--- Async/Await practice ---");

async function someAsyncTask() {
  console.log("Hi I am asynchronous");

  const result = await Promise.resolve("result");
  console.log("Hi I am next asynchronous");
  console.log("This is the:", result);
}

someAsyncTask();

console.log("Hi I am synchronous");

Promise.resolve("Traditional result")
  .then((result) => console.log("This is the:", result))
  .catch((error) => console.log(error));

async function handleAsyncError() {
  try {
    const result = await Promise.reject(new Error("Rejected async value"));
    console.log("This line will not run:", result);
  } catch (error) {
    console.log("Async error handled:", error.message);
  }
}

handleAsyncError();

async function sequenceExample() {
  const userName = await Promise.resolve("Abhishek");
  console.log("This is the username:", userName);

  const post = await Promise.resolve("Post by user");
  console.log("This is the post by user:", post);
}

sequenceExample();

async function nonPromiseAwait() {
  const result = await "I am the resolved promise data";
  console.log("Hi:", result);
}

nonPromiseAwait();

const asyncFunctionExpression = async () => {
  return "async function expression result";
};

asyncFunctionExpression().then((value) => {
  console.log(value);
});

async function sequentialStart() {
  const first = await Promise.resolve("First");
  console.log(first);
  const second = await Promise.resolve("Second");
  console.log(second);
}

sequentialStart();

async function parallelStart() {
  const [first, second] = await Promise.all([
    Promise.resolve("First"),
    Promise.resolve("Second"),
  ]);

  console.log(first, second);
}

parallelStart();

async function fetchDataAndProcess() {
  const response = await Promise.resolve({
    json() {
      return Promise.resolve({ title: "Async title" });
    },
  });

  response
    .json()
    .then((data) => {
      console.log("Title:", data.title);
    })
    .catch((error) => {
      console.error("Error processing data:", error);
    });
}

fetchDataAndProcess();

console.log("--- Async/Await practice complete ---");

console.log("--- Async/Await mini practice ---");
function add(n1, n2) {
  console.log(n1 + n2);
}

console.log("before resolved");

const funcasy = async () => {
  console.log("first resolved");
  setTimeout(() => {
    console.log("resolved after");
  }, 200);
  await add(4, 5);
  console.log("second resolved");
};

funcasy();
console.log("after resolved");

console.log("--- Async Await advanced practice ---");

async function fetchMultipleUrls(urls) {
  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const data = await Promise.all(responses.map((response) => response.json()));
    console.log("Data from all URLs:", data);
  } catch (error) {
    console.error("Error in fetching:", error);
  }
}

fetchMultipleUrls([
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
]);

async function fetchRace(urls) {
  try {
    const response = await Promise.race(urls.map((url) => fetch(url)));
    const data = await response.json();
    console.log("First response data:", data);
  } catch (error) {
    console.error("Error in fetching:", error);
  }
}

fetchRace([
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
]);

async function fetchAllSettled(urls) {
  const results = await Promise.allSettled(
    urls.map((url) => fetch(url).then((response) => response.json()))
  );

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Request ${index + 1} succeeded with data:`, result.value);
    } else {
      console.error(`Request ${index + 1} failed with reason:`, result.reason);
    }
  });
}

fetchAllSettled([
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://doesnotexist.typicode.com",
]);

async function fetchAny(urls) {
  try {
    const response = await Promise.any(urls.map((url) => fetch(url)));
    const data = await response.json();
    console.log("First successful response data:", data);
  } catch (error) {
    console.error("All promises were rejected:", error);
  }
}

fetchAny([
  "https://doesnotexist.typicode.com",
  "https://jsonplaceholder.typicode.com/posts/1",
]);

async function fetchMultipleUrlsWithErrorHandling(urls) {
  try {
    const result = await Promise.all(urls.map((url) => fetch(url).then((response) => response.json())));
    console.log(result);
  } catch (error) {
    console.error("One or more requests failed:", error);
  }
}

fetchMultipleUrlsWithErrorHandling([
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
]);

async function processUrls(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }
}

processUrls([
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
]);

async function processUrlsConcurrently(urls) {
  const promises = urls.map(async (url) => {
    const response = await fetch(url);
    return response.json();
  });

  const results = await Promise.all(promises);
  results.forEach((result) => console.log(result));
}

processUrlsConcurrently([
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
]);

async function processUrlsWithIndividualErrorHandling(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(`Failed to fetch ${url}:`, error);
    }
  }
}

processUrlsWithIndividualErrorHandling([
  "https://jsonplaceholder.typicode.com/posts/1",
  "invalid-url",
]);

console.log("--- Ghost promise note ---");
function alwaysPromise(test) {
  if (test) {
    return Promise.resolve(100);
  }

  return Promise.reject(new Error("No value available"));
}

alwaysPromise(true).then((value) => {
  console.log("Always promise value:", value);
});

console.log("--- Promise practice ---");

const promiseResolve = new Promise((resolve, reject) => {
  resolve("This promise has resolved.");
});

promiseResolve
  .then((value) => {
    console.log(value);
  })
  .catch(() => "sorry");

{
  const promiseReject = new Promise((resolve, reject) => {
    reject("This promise has been rejected.");
  });

  promiseReject
    .then((value) => {
      console.log(value);
    })
    .catch((error) => {
      console.error("Inside Catch", error);
    });
}

{
  const promiseReject = new Promise((resolve, reject) => {
    reject("This promise has been rejected.");
  });

  promiseReject
    .then(
      (value) => {
        console.log(value);
      },
      (error) => {
        console.error("Reject handler", error);
        throw new Error("Error inside then's reject handler");
      }
    )
    .catch((error) => {
      console.error("Inside Catch", error.message);
    });
}

const promiseResolveThenThrow = new Promise((resolve, reject) => {
  resolve("This promise has been resolved.");
});

promiseResolveThenThrow
  .then(
    (value) => {
      console.log(value);
      throw new Error("Error aaya hai .then me");
    },
    (error) => {
      console.error("Reject handler", error);
    }
  )
  .catch((error) => {
    console.error("Inside Catch", error.message);
  });

const promiseTimeout = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Result after 2 seconds");
  }, 200);
});

promiseTimeout.then((value) => {
  console.log(value);
});

const processData = (data) =>
  new Promise((resolve, reject) => {
    console.log("AbhishekDhone.work@gmail.com");
    resolve(`${data} processed`);
  });

const logData = (data) =>
  new Promise((resolve, reject) => {
    console.log(`${data} password fetched`);
    resolve("Logging complete");
  });

processData("Fetch email of Abhishek Dhone")
  .then(logData)
  .then((result) => {
    console.log(result);
  });

const checkNumber = (number) =>
  new Promise((resolve, reject) => {
    if (number > 10) {
      resolve("The number is greater than 10.");
    } else {
      reject("The number is 10 or less.");
    }
  });

checkNumber(15)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

const getUserPermission = (user) =>
  new Promise((resolve, reject) => {
    if (user.isAdmin) {
      setTimeout(() => resolve("User has admin permissions"), 100);
    } else {
      reject("User is not an admin");
    }
  });

getUserPermission({ isAdmin: false })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

const fetchDataPractice = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: "Raw Data" }), 100);
  });

const parseData = (data) => `${data} Parsed`;

fetchDataPractice()
  .then((response) => parseData(response.data))
  .then((parsed) => console.log(parsed))
  .catch((error) => console.error(error));

const fetchUserById = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`User with ID: ${id}`), id * 50);
  });

[1, 2, 3].reduce((promiseChain, userId) => {
  return promiseChain.then(() => fetchUserById(userId)).then((user) => console.log(user));
}, Promise.resolve());

const fetchResource = (resource) =>
  new Promise((resolve, reject) => {
    console.log(`Fetching ${resource}`);
    setTimeout(() => resolve(`Resource ${resource} fetched`), 100);
  });

const resources = ["Resource 1", "Resource 2", "Resource 3"];

resources.forEach((resource) => {
  fetchResource(resource)
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
});

console.log("--- Promise practice complete ---");

console.log("--- Promise API ---");

const apiPromise1 = Promise.resolve(3);
const apiPromise2 = 42;
const apiPromise3 = new Promise((resolve) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([apiPromise1, apiPromise2, apiPromise3]).then((values) => {
  console.log("Promise.all values:", values);
});

const apiAllSettledA = Promise.resolve("resolved");
const apiAllSettledB = Promise.reject("Failed");

Promise.allSettled([apiAllSettledA, apiAllSettledB]).then((results) => {
  results.forEach((result) => console.log(result));
  console.log(results[0].value);
});

const apiRaceOne = new Promise((resolve) => {
  setTimeout(resolve, 500, "one");
});

const apiRaceTwo = new Promise((resolve) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([apiRaceOne, apiRaceTwo]).then((value) => {
  console.log("Promise.race winner:", value);
});

const apiAnyFirst = Promise.reject(0);
const apiAnySecond = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const apiAnyThird = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

Promise.any([apiAnyFirst, apiAnySecond, apiAnyThird]).then((value) => {
  console.log("Promise.any winner:", value);
});

const resolveMyPromise = new Promise((resolve) => {
  resolve("The promise has been resolved with the data");
});

resolveMyPromise.then((response) => console.log(response));

const resolvedPromise = Promise.resolve("Resolved");
resolvedPromise.then((response) => console.log(response));

const rejectMyPromise = new Promise((resolve, reject) => {
  reject("The promise has been rejected with the error");
});

rejectMyPromise.then(
  () => {
    console.log("success");
  },
  (error) => console.log(error)
);

const rejectedPromise = Promise.reject(new Error("Rejected"));
rejectedPromise.catch((error) => console.error(error.message));

console.log("--- Promise API with setTimeout ---");
function promiseAllTimeout() {
  const timeoutPromise1 = new Promise((resolve) => setTimeout(resolve, 100, "Result 1"));
  const timeoutPromise2 = new Promise((resolve) => setTimeout(resolve, 200, "Result 2"));

  Promise.all([timeoutPromise1, timeoutPromise2]).then((results) => {
    console.log("Promise.all results:", results);
  });
}

function promiseAllSettledTimeout() {
  const settledPromise1 = Promise.resolve("Success");
  const settledPromise2 = Promise.reject("Error");

  Promise.allSettled([settledPromise1, settledPromise2]).then((results) => {
    console.log("Promise.allSettled results:", results);
  });
}

function promiseAnyTimeout() {
  const anyTimeout1 = new Promise((_, reject) => setTimeout(reject, 100, "Reject 1"));
  const anyTimeout2 = new Promise((resolve) => setTimeout(resolve, 200, "Resolve 2"));

  Promise.any([anyTimeout1, anyTimeout2]).then((result) => {
    console.log("Promise.any result:", result);
  });
}

function promiseRaceTimeout() {
  const raceTimeout1 = new Promise((resolve) => setTimeout(resolve, 500, "Slow"));
  const raceTimeout2 = new Promise((resolve) => setTimeout(resolve, 100, "Fast"));

  Promise.race([raceTimeout1, raceTimeout2]).then((result) => {
    console.log("Promise.race result:", result);
  });
}

function examplePromiseResolve() {
  Promise.resolve("Immediate resolve").then((result) => {
    console.log("Promise.resolve result:", result);
  });
}

function examplePromiseReject() {
  Promise.reject(new Error("Immediate reject")).catch((error) => {
    console.error("Promise.reject error:", error.message);
  });
}

promiseAllTimeout();
promiseAllSettledTimeout();
promiseAnyTimeout();
promiseRaceTimeout();
examplePromiseResolve();
examplePromiseReject();

console.log("--- Notes ---");
// Promises represent future values.
// .then() handles fulfillment, .catch() handles rejection.
// async functions always return promises.
// await pauses only the async function, not the whole program.
