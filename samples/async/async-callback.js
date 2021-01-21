"use strict";

const fs = require("fs");

const buffers = [];
let pending = 0;

// error-first callback
// errback
pending++;
fs.readFile("1.txt", (err, buffer1) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    buffers[0] = buffer1;
    pending--;
    if (pending === 0) {
      process.stdout.write(Buffer.concat(buffers));
    }
  }
});

pending++;
fs.readFile("2.txt", (err, buffer2) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    buffers[1] = buffer2;
    pending--;
    if (pending === 0) {
      process.stdout.write(Buffer.concat(buffers));
    }
  }
});

pending++;
fs.readFile("3.txt", (err, buffer3) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    buffers[2] = buffer3;
    pending--;
    if (pending === 0) {
      process.stdout.write(Buffer.concat(buffers));
    }
  }
});

/*
const buffer1 = fs.readFileSync("1.txt");
const buffer2 = fs.readFileSync("2.txt");
const buffer3 = fs.readFileSync("3.txt");

const buffer = Buffer.concat([buffer1, buffer2, buffer3]);

process.stdout.write(buffer);
*/
