"use strict";

const fs = require("fs/promises");

// fs.readFile("1.txt"); // Promise<Buffer>

process.cwd; // current working directory
__dirname; // this file's directory

fs.readFile(__dirname + "/1.txt")
  .then((buffer1) => {
    return fs.readFile(__dirname + "/2.txt").then((buffer2) => {
      return fs.readFile(__dirname + "/3.txt").then((buffer3) => {
        const buffer = Buffer.concat([buffer1, buffer2, buffer3]);
        process.stdout.write(buffer);
      });
    });
  })
  .catch((err) => {
    console.error("Nope", err.message);
    process.exit(1);
  });
