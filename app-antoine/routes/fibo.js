'use strict';

const fibo = require('../lib/fibo');

const fiboRoute = (req, res) => {
	const input = Number(req.params.number);
	const result = fibo(input);
	res.send({ input, result });
};

module.exports.fiboRoute = fiboRoute;
