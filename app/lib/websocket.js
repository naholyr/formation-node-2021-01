'use strict';

const socketIo = require('socket.io');

/* optional dependencies:
let bufferutil;
try {
  bufferutil = require('bufferutil')
} catch (err) {
  bufferutil = require('bufferutiljs')
}

Also see https://socket.io/docs/v3/server-installation/#Other-WebSocket-server-implementations
*/

module.exports = (server) => {
	const io = socketIo(server);

	// Integration with Express: https://socket.io/docs/v3/middlewares/#Compatibility-with-Express-middleware
	// Auth middleware (handshake)
	io.use((socket, next) => {
		if (socket.handshake.auth.username) {
			next();
		} else {
			next(new Error('No username provided'));
		}
	});

	io.on('connection', (socket) => {
		// socket = connection to client
		socket.handshake.username; // validated by middleware
		//
		// socket.on = message from client
		// socket.emit = message to client
		// io.emit = message to everyone
		// socket.broadcast.emit = message to everyone except client
		// socket.volatile.emit = message not guaranteed (~ throttle)
		//
		// ROOMS:
		// socket.join('room') = add to group
		// socket.leave('room') = remove from group
		// io.to('room1').emit = send to sockets of group "room1"
		// io.to('room1').to('room2').emit = send to sockets of group "room1" + "room2"
		// socket.broadcast.to('room').emit = on a compris

		socket.on('disconnect', () => {
			console.log('bye bye', socket.id);
		});
	});
};
