"use strict";

const http = require("http");

// *Sync()
// recusive functions
// calculs complexes "cpu intensive"

const fibo = (n) => (n === 0 ? 0 : n === 1 ? 1 : fibo(n - 1) + fibo(n - 2));

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("coucou");
    res.end();
  } else if (req.url === "/fibo") {
    const n = 41;
    res.write(`fibo(${n}) = ${fibo(n)}`);
    res.end();
  } else {
    res.write("Not found");
    res.end();
  }
});

server.listen(8000, () => {
  console.log("Server ready http://localhost:8000");
});
