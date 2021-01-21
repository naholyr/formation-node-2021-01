'use strict';

const http = require('http');
const app = require('./app');
const logger = require('./lib/logger');

const server = http.createServer(app);

server.listen(8000, () => {
	logger.info('Server ready http://localhost:8000');
});
