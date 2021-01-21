'use strict';

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
	name: 'server',
});

const loggerMiddleware = (req, res, next) => {
	res.set('x-powered-by', 'çateregarde');
	logger.info({ method: req.method, url: req.url });
	next();
};

module.exports = { loggerMiddleware, logger };
