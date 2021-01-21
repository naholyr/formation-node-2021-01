"use strict";

const fs = require("fs/promises");

// Imaginons…
// 1.txt = 2s
// 2.txt = 10s
// 3.txt = 5s

const main = async () => {
  try {
    const buffer1P = fs.readFile("1.txt");
    const buffer2P = fs.readFile("2.txt");
    const buffer3P = fs.readFile("3.txt");
    // +3 ms

    const buffer = Buffer.concat([
      await buffer1P, // +2s
      await buffer2P, // +8s
      await buffer3P, // +0s (résolu depuis 5s)
    ]);

    process.stdout.write(buffer);
  } catch (err) {
    console.error("Ooops", err.message);
    process.exit(1);
  }
};

const main2 = async () => {
  try {
    const buffers = await Promise.all([
      fs.readFile("1.txt"),
      fs.readFile("2.txt"),
      fs.readFile("3.txt"),
    ]);

    const buffer = Buffer.concat(buffers);
    process.stdout.write(buffer);
  } catch (err) {
    console.error("Ooops", err.message);
    process.exit(1);
  }
};

main2();
