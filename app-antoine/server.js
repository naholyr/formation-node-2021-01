'use strict';

const http = require('http');
const app = require('./app');
const { logger } = require('./middleware/logger');
const config = require('config');

const server = http.createServer(app);

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

server.listen(config.server.port, () => {
	logger.info(`Server ready http://localhost:${config.server.port}`);
});
