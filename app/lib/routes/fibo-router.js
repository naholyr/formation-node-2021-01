'use strict';

const { Router } = require('express');
const fibo = require('../fibo');

const fiboRouter = new Router();

fiboRouter.get('/:number([0-9]+)', (req, res) => {
	const input = Number(req.params.number);
	const result = fibo(input);
	res.send({ input, result });
});

module.exports = fiboRouter;
