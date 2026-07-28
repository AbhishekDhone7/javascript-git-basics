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

console.log("--- Notes ---");
// Promises represent future values.
// .then() handles fulfillment, .catch() handles rejection.
// async functions always return promises.
// await pauses only the async function, not the whole program.
