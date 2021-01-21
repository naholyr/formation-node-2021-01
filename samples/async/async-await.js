"use strict";

const fs = require("fs/promises");

const main = async () => {
  try {
    const buffer1 = await fs.readFile("1.txt");
    const buffer2 = await fs.readFile("2.txt");
    const buffer3 = await fs.readFile("3.txt");

    const buffer = Buffer.concat([buffer1, buffer2, buffer3]);

    process.stdout.write(buffer);
  } catch (err) {
    console.error("Ooops", err.message);
    process.exit(1);
  }
};
