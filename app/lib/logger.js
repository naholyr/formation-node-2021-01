'use strict';

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
	name: 'server',
});

module.exports = logger;
