'use strict';

const http = require('http');
const app = require('./app');
const { logger } = require('./middleware/logger');
const config = require('config');
const { initWebsocket } = require('./lib/websocket');
const server = http.createServer(app);

initWebsocket(server);

server.listen(config.server.port, () => {
	logger.info(`Server ready http://localhost:${config.server.port}`);
});
