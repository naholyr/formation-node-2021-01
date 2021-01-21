'use strict';

const express = require('express');
const morgan = require('morgan');

const fibo = require('./lib/fibo');
const home = require('./lib/routes/home');
const { loggerMiddleware } = require('./lib/middlewares/logger');

const app = express();

app.settings['x-powered-by'] = false;
// app.settings['etag'] = false; // save CPU but lose bandwidth

// Middleware
app.use(loggerMiddleware);

app.use(morgan('dev'));

app.get('/', home);

app.get('/fibo/:number([0-9]+)', (req, res) => {
	const input = Number(req.params.number);
	const result = fibo(input);
	res.send({ input, result });
});

module.exports = app;
