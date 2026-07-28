/*
  Topic: RESTful APIs with Fetch
  Difficulty: Beginner to Intermediate
  Primary Concept: Using HTTP verbs and fetch() to work with REST-style endpoints
*/

console.log("--- RESTful API basics ---");
console.log("GET retrieves data, POST creates data, PUT updates data, DELETE removes data.");
console.log("REST APIs are resource-based and typically exchange JSON.");

console.log("--- Fetch basics ---");
console.log("fetch(resource, init) returns a promise that resolves to a Response object.");
console.log("fetch rejects only for network errors; HTTP 4xx/5xx must be checked with response.ok.");

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function runRestExamples() {
  console.log("--- Example 1: Basic GET request ---");
  const post = await fetchJson("https://jsonplaceholder.typicode.com/posts/1");
  console.log(post);

  console.log("--- Example 2: Basic POST request ---");
  const createdPost = await fetchJson("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(createdPost);

  console.log("--- Example 3: Handling HTTP errors ---");
  try {
    await fetchJson("https://jsonplaceholder.typicode.com/invalid-url");
  } catch (error) {
    console.log("Error:", error.message);
  }

  console.log("--- Example 4: PUT request ---");
  const updatedPost = await fetchJson("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    body: JSON.stringify({
      id: 1,
      title: "Updated Title",
      body: "Updated body",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(updatedPost);

  console.log("--- Example 5: DELETE request ---");
  const deleteResponse = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE",
  });
  if (!deleteResponse.ok) {
    throw new Error(`HTTP error! status: ${deleteResponse.status}`);
  }
  console.log("Post deleted");

  console.log("--- Example 6: Query parameters ---");
  const postsForUser = await fetchJson("https://jsonplaceholder.typicode.com/posts?userId=1");
  console.log(postsForUser.slice(0, 2));

  console.log("--- Example 7: Handling JSON and text responses ---");
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    console.log(await response.json());
  } else {
    console.log(await response.text());
  }

  console.log("--- Example 8: Fetch with AbortController ---");
  const controller = new AbortController();
  const signal = controller.signal;
  const abortPromise = fetch("https://jsonplaceholder.typicode.com/posts", { signal });
  controller.abort();
  try {
    await abortPromise;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      throw error;
    }
  }

  console.log("--- Example 9: Fetch with async/await ---");
  async function fetchData() {
    try {
      const asyncResponse = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      if (!asyncResponse.ok) {
        throw new Error(`HTTP error! status: ${asyncResponse.status}`);
      }
      const asyncData = await asyncResponse.json();
      console.log(asyncData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  await fetchData();

  console.log("--- Example 10: Sequential fetch requests ---");
  async function fetchSequentially() {
    try {
      const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const postData = await postResponse.json();
      console.log(postData);

      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
      const userData = await userResponse.json();
      console.log(userData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  await fetchSequentially();
}

runRestExamples().catch((error) => {
  console.log("REST example flow failed:", error.message);
});

console.log("--- Notes ---");
// Fetch is promise-based and well suited to REST-style APIs.
// Use response.ok to detect HTTP-level failures.
// JSONPlaceholder is a sample API used here for readable examples.
