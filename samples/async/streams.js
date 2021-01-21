"use strict";

const fs = require("fs");

const output = fs.createWriteStream("output.txt");

process.stdin.pipe(output);
process.stdin.pipe(process.stdout);
