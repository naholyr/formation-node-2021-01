'use strict';

const logger = require('./logger');

const loggerMiddleware = (req, res, next) => {
	res.set('x-powered-by', 'çateregarde');
	logger.info({ method: req.method, url: req.url });
	next();
};

module.exports = loggerMiddleware;
