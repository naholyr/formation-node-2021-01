'use strict';

const socketIo = require('socket.io');

module.exports.initWebsocket = (server) => {
	// event emitter
	const io = socketIo(server);

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

	io.use((socket, next) => {
		if (socket.handshake.auth) {
			next();
		} else {
			next(new Error('No username provided'));
		}
	});

	io.on('connection', (socket) => {
		socket
			.on('connect', () => {
				console.log('ok');
			})
			.on('disconnect', () => {
				console.log('ko');
			});
	});
};
