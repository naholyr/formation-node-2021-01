'use strict';

const fibo = require('../fibo');
const workerpool = require('workerpool');

// create a worker and register public functions
workerpool.worker({
	fibo,
});
