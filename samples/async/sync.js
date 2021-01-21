"use strict";

const fs = require("fs");

try {
  const buffer1 = fs.readFileSync("1.txt");
  const buffer2 = fs.readFileSync("2.txt");
  const buffer3 = fs.readFileSync("3.txt");

  const buffer = Buffer.concat([buffer1, buffer2, buffer3]);

  process.stdout.write(buffer);
} catch (err) {
  console.error("Ooops", err.message);
  process.exit(1);
}
