"use strict";

const EventEmitter = require("events");

const ee = new EventEmitter();

// Special event "error" === throw
ee.on("error", (err) => console.error(err));
ee.emit("error", "coucou");

// emit ≠ non blocking === execute handlers
const fibo = (n) => (n === 0 ? 0 : n === 1 ? 1 : fibo(n - 1) + fibo(n - 2));
ee.on("fibo", (n) => console.log(`fibo(${n}) = ${fibo(n)}`));
console.log(1);
ee.emit("fibo", 8);
ee.emit("fibo", 9);
ee.emit("fibo", 7);
console.log(2);

// Memory leak

const timer = new EventEmitter();
setInterval(() => timer.emit("time", new Date()), 1000);

// timer.setMaxListeners(100);

ee.on("connection", (socket) => {
  timer.on("time", () => {
    console.log(socket, new Date());
  });
  // TODO on socket disconnect : remove listener
});

/*
const sockets = [];
timer.on("time", (time) => {
  sockets.forEach((socket) => console.log(socket, time));
});
ee.on("connection", (socket) => {
  sockets.push(socket);
  // TODO on socket disconnect : remove socket from array
  // le problème est toujours là, mais plus explicite
});
*/

for (let i = 0; i < 20; i++) {
  ee.emit("connection", "Socket #" + i);
}
