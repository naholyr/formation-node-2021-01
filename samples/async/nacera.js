"use strict";

//const fs = require("fs");

// error-first callback
// errback
/*
const fs = require("fs");

fs.readFile("1.txt", (err, buffer1) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    //process.stdout.write(buffer1);
    fs.readFile("2.txt", (err, buffer2) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        //process.stdout.write(buffer2);
        fs.readFile("3.txt", (err, buffer3) => {
          if (err) {
            console.error(err);
            process.exit(1);
          } else {
            //concat des 3 buffers
            const buffer = Buffer.concat([buffer1, buffer2, buffer3]);
            process.stdout.write(buffer);
          }
        });
      }
    });
  }
});
*/

/* callback API → promise API: * /
new Promise((resolve, reject) => {
  fs.readFile('1.txt', (err, buffer) => {
    if (err) {
      reject(err)
    } else {
      resolve(buffer)
    }
  })
})
/**/

/* idée de nomenclature:
toto : U;
totos : Array<U>;
totoP : Promise<U>;
totoPs : Array<Promise<U>>;
totosP : Promise<Array<U>>;
*/

const fs = require("fs/promises");

const readFile1 = fs.readFile("1.txt"); // Promise<Buffer>
const readFile2 = fs.readFile("2.txt"); // Promise<Buffer>
const readFile3 = fs.readFile("3.txt"); // Promise<Buffer>

const allPromise = Promise.all(
  [readFile1, readFile2, readFile3] /* Array<Promise<Buffer>> */
); // Promise<Array<Buffer>>

allPromise.then((buffers /* Array<Buffer> */) => {
  const buffer = Buffer.concat(buffers);

  process.stdout.write(buffer);
});
