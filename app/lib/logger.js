'use strict';

const bunyan = require('bunyan');
const config = require('config');

var logger = bunyan.createLogger({
	name: 'MAIN',
	level: config.bunyan.level,
});

if (config.bunyan.useStderr) {
	logger.addStream(
		{
			stream: process.stderr,
		},
		'warn'
	);
}

if (config.bunyan.disabled) {
	logger.level(bunyan.FATAL + 1);
}

module.exports = logger;
