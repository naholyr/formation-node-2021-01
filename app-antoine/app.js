'use strict';

const express = require('express');
const morgan = require('morgan');
const { fiboRoute } = require('./routes/fibo');
const { home } = require('./routes/home');
const { defaultLogger } = require('./middleware/logger');
const config = require('config');
const compression = require('compression');
const app = express();

app.settings['x-powered-by'] = false;

app.use(defaultLogger);
app.use(morgan(config.morgan.format));

if (config.server.gzip) {
	app.use(compression());
}

app.use(express.static('public'));

app.get('/', home);

app.get('/fibo/:number([0-9]+)', fiboRoute);

module.exports = app;
