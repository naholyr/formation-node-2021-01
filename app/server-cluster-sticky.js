'use strict';
const config = require('config');
const lipstick = require('lipstick');

lipstick('./server.js', { port: config.server.port }, () => {
	console.log(
		'Sticky Session Cluster ready: http://localhost:' + config.server.port
	);
});
