'use strict';

const socketIo = require('socket.io');
const debug = require('debug')('websocket');

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

	debug('socket.io initialized');

	// Integration with Express: https://socket.io/docs/v3/middlewares/#Compatibility-with-Express-middleware
	// Auth middleware (handshake)
	io.use((socket, next) => {
		if (socket.handshake.auth.username) {
			next(); // Connection accepted
		} else {
			next(new Error('No username provided')); // Connection rejected
		}
	});

	io.on('connection', (socket) => {
		// socket = connection to client
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

		debug(
			'socket connected',
			socket.handshake.auth.username, // validated by middleware
			socket.id
		);

		socket.join('chat:(system)');
		socket.join('chat:@' + socket.handshake.auth.username);
		socket.join('chat:#general');

		socket.on('join-room', (room) => {
			socket.join('chat:' + room);
			io.to('chat:' + room).emit('recv-message', {
				system: true,
				room,
				message: 'a rejoint ' + room,
				username: socket.handshake.auth.username,
				date: Date.now(),
			});
		});

		socket.on('leave-room', (room) => {
			socket.leave('chat:' + room);
			io.to('chat:' + room).emit('recv-message', {
				system: true,
				room,
				message: 'a quitté ' + room,
				username: socket.handshake.auth.username,
				date: Date.now(),
			});
		});

		socket.broadcast
			.to('chat:(system)')
			.emit('logged-in', socket.handshake.auth.username);
		// TODO send message to room "(system)"

		socket.on('disconnect', () => {
			debug('socket disconnected', socket.id);
		});

		socket.on('send-message', (message, room) => {
			io.to('chat:' + room).emit('recv-message', {
				message,
				username: socket.handshake.auth.username,
				date: Date.now(),
				room,
			});
		});

		// socket.disconnect();
	});
};
