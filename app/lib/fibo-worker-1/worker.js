'use strict';

const fibo = require('../fibo');

process.on('message', ({ input, id }) => {
	console.log('[%s] compute fibo(%s)', process.pid, input);
	const result = fibo(Number(input));
	process.send({ output: result, id });
});
