'use strict';

const http = require('http');
const app = require('./app');
const { logger } = require('./lib/middlewares/logger');
const config = require('config');
const initWebsocket = require('./lib/websocket');

const server = http.createServer(app);

initWebsocket(server);

server.listen(config.port, () => {
	logger.info(`Server ready http://localhost:${config.port}`);
});
