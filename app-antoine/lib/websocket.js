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
		if (socket.handshake.auth.username) {
			next();
		} else {
			next(new Error('No username provided'));
		}
	});

	io.on('connection', (socket) => {
		socket.join('chat:(system)');
		socket.join('chat:@' + socket.handshake.auth.username);
		socket.join('chat:#general');

		socket.broadcast
			.to('chat:(system)')
			.emit('logged-in', socket.handshake.auth.username);

		socket.on('leave-room', (room) => {
			socket.leave('chat:' + room);

			io.to('chat:' + room).emit('left-room', {
				room,
				username: socket.handshake.auth.username,
			});
		});

		socket.on('join-room', (data) => {
			console.log('joined room: ', data);

			socket.join('chat:' + data.room);

			io.to('chat:' + data.room).emit('joined-room', {
				room: data.room,
				username: socket.handshake.auth.username,
			});

			// io.to('chat:' + room).emit('recv-message', {
			// 	room,
			// 	username: socket.handshake.auth.username,
			// 	system: true,
			// });
		});

		socket.on('send-message', (data) => {
			console.log('message sent, data: ', data);

			io.to('chat:' + data.room).emit('recv-message', {
				message: data.message,
				room: data.room,
				username: socket.handshake.auth.username,
			});
		});
	});
};
