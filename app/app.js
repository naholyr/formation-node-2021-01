'use strict';

const express = require('express');
const morgan = require('morgan');
const home = require('./lib/routes/home');
const fiboRouter = require('./lib/routes/fibo-router');
const auth = require('./lib/routes/session-test');
const loggerMiddleware = require('./lib/logger-middleware');
const config = require('config');
const compression = require('compression');
const session = require('express-session');

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

// very first connection = server response + cookie "session id" + generates associated data
// second connection = request + cookie "session id" = server finds associated data
// each request = server can modify data + saves
app.use(
	session({
		secret: config.session.secret, // signed cookies
		resave: true, // should I resave unmodified data + reset expiration ?
		saveUninitialized: false, // should I save initial empty data + set cookie id ?
	})
);

// ------- //
// Routing //
// ------- //

// app.use(bodyParser.urlencoded())
// app.use(bodyParser.json())
// app.use(session({ … })) // use with store provided by connect-redis

// Route = handler in module
app.get('/', home);
app.get('/session-test/status', auth.status);
app.get('/session-test/logout', auth.logout);
app.get('/session-test/login/:login', auth.login);

// Alternative: router in module
app.use('/fibo', fiboRouter);

// ------ //
// Export //
// ------ //

module.exports = app;
