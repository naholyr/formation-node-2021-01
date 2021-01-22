'use strict';

const http = require('http');
const app = require('./app');
const logger = require('./lib/logger');
const config = require('config');
const initWebsocket = require('./lib/websocket');
const lipstick = require('lipstick');

const server = http.createServer(app);

initWebsocket(server);

lipstick.listen(server, config.server.port, () => {
	logger.info(`Server ready http://localhost:${server.address().port}`);
});
