'use strict';

const express = require('express');
const morgan = require('morgan');
const { fiboRoute } = require('./routes/fibo');
const { home } = require('./routes/home');
const { defaultLogger } = require('./middleware/logger');
const config = require('config');

const app = express();

app.settings['x-powered-by'] = false;

app.use(defaultLogger);
app.use(morgan(config.morgan.format));

app.get('/', home);

app.get('/fibo/:number([0-9]+)', fiboRoute);

module.exports = app;
