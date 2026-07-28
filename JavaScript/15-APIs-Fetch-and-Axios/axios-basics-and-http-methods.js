/*
  Topic: Axios Basics and HTTP Methods
  Difficulty: Beginner to Intermediate
  Primary Concept: Using Axios to make HTTP requests with simpler JSON handling and richer errors
*/

function loadAxios() {
  if (globalThis.axios) {
    return globalThis.axios;
  }

  try {
    return require("axios");
  } catch (error) {
    return null;
  }
}

const axiosClient = loadAxios();

console.log("--- Axios basics ---");
if (!axiosClient) {
  console.log("Axios is not installed in this workspace, so the live request demos are skipped.");
  console.log("In a browser, include Axios via CDN. In Node, install the axios package.");
} else {
  console.log("Axios is available.");
}

async function runAxiosExamples() {
  if (!axiosClient) {
    return;
  }

  console.log("--- Example 1: Basic GET request ---");
  const getResponse = await axiosClient.get("https://jsonplaceholder.typicode.com/posts/1");
  console.log(getResponse.data);

  console.log("--- Example 2: Handling HTTP error statuses ---");
  try {
    await axiosClient.get("https://jsonplaceholder.typicode.com/posts/999");
  } catch (error) {
    if (error.response) {
      console.log(`HTTP error! status: ${error.response.status}`);
    } else {
      console.log("Error:", error.message);
    }
  }

  console.log("--- Example 3: Using parameters with Axios ---");
  const queryResponse = await axiosClient.get("https://jsonplaceholder.typicode.com/posts", {
    params: {
      userId: 1,
    },
  });
  console.log(queryResponse.data.slice(0, 2));

  console.log("--- Example 4: Axios POST request ---");
  const postResponse = await axiosClient.post("https://jsonplaceholder.typicode.com/posts", {
    title: "foo",
    body: "bar",
    userId: 1,
  });
  console.log(postResponse.data);

  console.log("--- Example 5: Handling different response types ---");
  const response = await axiosClient.get("https://jsonplaceholder.typicode.com/posts/1");
  const contentType = response.headers["content-type"] || "";
  if (contentType.includes("application/json")) {
    console.log(response.data);
  } else {
    console.log(String(response.data));
  }

  console.log("--- Example 6: Advanced error handling ---");
  try {
    await axiosClient.get("https://jsonplaceholder.typicode.com/posts/999");
  } catch (error) {
    console.log("Axios error:", error.toString());
  }

  console.log("--- Example 7: Using async/await with Axios ---");
  async function fetchData() {
    try {
      const asyncResponse = await axiosClient.get("https://jsonplaceholder.typicode.com/posts/1");
      console.log(asyncResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  await fetchData();

  console.log("--- Example 8: Axios request cancellation ---");
  if (typeof axiosClient.CancelToken !== "undefined") {
    const CancelToken = axiosClient.CancelToken;
    const source = CancelToken.source();

    axiosClient
      .get("https://jsonplaceholder.typicode.com/posts", { cancelToken: source.token })
      .catch((error) => {
        if (axiosClient.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error:", error);
        }
      });

    source.cancel("Operation canceled by the user.");
  } else {
    const controller = new AbortController();
    controller.abort();
    console.log("AbortController cancellation is the modern Axios-friendly alternative.");
  }

  console.log("--- Example 9: Sequential Axios requests with async/await ---");
  async function fetchSequentially() {
    try {
      const post = await axiosClient.get("https://jsonplaceholder.typicode.com/posts/1");
      console.log(post.data);

      const user = await axiosClient.get(`https://jsonplaceholder.typicode.com/users/${post.data.userId}`);
      console.log(user.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  await fetchSequentially();
}

runAxiosExamples().catch((error) => {
  console.error("Axios example flow failed:", error);
});

console.log("--- Notes ---");
// Axios automatically parses JSON responses.
// Axios rejects on non-2xx HTTP statuses.
// Axios supports interceptors, instances, and cancellation.
// This lesson skips live calls if Axios is not installed in the workspace.
