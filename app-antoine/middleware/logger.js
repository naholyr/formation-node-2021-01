'use strict';

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
	name: 'server',
});

const defaultLogger = (req, res, next) => {
	logger.info({ method: req.method, url: req.url });
	next();
};

module.exports = {
	defaultLogger,
	logger,
};
