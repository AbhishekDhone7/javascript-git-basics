/*
  Topic: Basic HTTP Server in Node.js (CommonJS)
  Difficulty: Beginner
  Primary Concept: Creating a simple server with Node's built-in http module
*/

const http = require("node:http");

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello, Server!");
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
  console.log("Open the URL in your browser to see: Hello, Server!");
});
