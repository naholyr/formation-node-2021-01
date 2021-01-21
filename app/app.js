'use strict';

const express = require('express');
const morgan = require('morgan');
const home = require('./lib/routes/home');
const fiboRouter = require('./lib/routes/fibo-router');
const loggerMiddleware = require('./lib/logger-middleware');
const config = require('config');
const compression = require('compression');

const app = express();

// -------- //
// Settings //
// -------- //

app.settings['x-powered-by'] = false;

// app.settings['etag'] = false; // save CPU but lose bandwidth

// ----------- //
// Middlewares //
// ----------- //

if (config.server.gzip) {
	app.use(compression());
}

app.use(express.static('public'));

app.use(loggerMiddleware);

app.use(morgan(config.morgan.format));

// ------- //
// Routing //
// ------- //

// app.use(bodyParser.urlencoded())
// app.use(bodyParser.json())
// app.use(session({ … })) // use with store provided by connect-redis

// Route = handler in module
app.get('/', home);

// Alternative: router in module
app.use('/fibo', fiboRouter);

// ------ //
// Export //
// ------ //

module.exports = app;
