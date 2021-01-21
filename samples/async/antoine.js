"use strict";

const fs = require("fs/promises");

Promise.all([fs.readFile("1.txt"), fs.readFile("2.txt"), fs.readFile("3.txt")])
  .then(([buffer1, buffer2, buffer3]) => {
    const buffer = Buffer.concat([buffer1, buffer2, buffer3]);
    process.stdout.write(buffer);
    return Promise.resolve("ok");
  })
  .catch((err) => console.error(err));
