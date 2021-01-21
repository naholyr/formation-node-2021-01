const workerpool = require('workerpool');

// create a worker pool using an external worker script
const pool = workerpool.pool(__dirname + '/worker.js');

// run registered functions on the worker via exec
module.exports = (n) => pool.exec('fibo', [n]);

/*
Promise.all([38, 39, 40, 41, 42].map(fibo))
	.then(console.log, console.error)
	.then(() => pool.terminate());
*/
