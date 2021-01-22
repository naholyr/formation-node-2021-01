'use strict';

const socketIo = require('socket.io');
const debug = require('debug')('websocket');
const { defaultClient: redis } = require('./redis-client');
const logger = require('./logger');
// const fibo = require('./fibo'); // TODO fibo-worker-2/master + asynchrone
const fibo = require('./fibo-worker-2/master');
const redisAdapter = require('socket.io-redis');
const config = require('config');

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

	io.adapter(redisAdapter(config.redis));

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

	const sendMessage = async (data) => {
		// Liste: LPUSH key item
		try {
			// db.messages.insert(data)
			const size = await redis.lpush(data.room, JSON.stringify(data));
			if (size > 60) {
				await redis.ltrim(data.room, 0, 50);
			}
			io.to('chat:' + data.room).emit('recv-message', data);
		} catch (err) {
			logger.error(err, 'could not send message');
		}
	};

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
			socket.id,
			process.pid
		);

		socket.join('chat:(system)');
		socket.join('chat:@' + socket.handshake.auth.username);
		socket.join('chat:#general');

		socket.on('join-room', (room) => {
			socket.join('chat:' + room);
			sendMessage({
				system: true,
				room,
				message: 'a rejoint ' + room,
				username: socket.handshake.auth.username,
				date: Date.now(),
			});
		});

		socket.on('leave-room', (room) => {
			socket.leave('chat:' + room);
			sendMessage({
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

		socket.on('send-message', async (message, room) => {
			// ChatBot: fibo
			const matchFibo = message.match(/^\/fibo\s+(\d+)$/);
			if (matchFibo) {
				const n = Number(matchFibo[1]);
				const result = await fibo(n);
				sendMessage({
					message: `fibo(${n}) = ${result}`,
					username: socket.handshake.auth.username,
					date: Date.now(),
					room,
					system: true,
				});
				return;
			}

			sendMessage({
				message,
				username: socket.handshake.auth.username,
				date: Date.now(),
				room,
			});
		});

		socket.on('get-messages', async (room, cb) => {
			// Liste: LRANGE key start stop
			// TODO grab latest messages of room
			// MongoDB: db.messages.find({ room }, { orderBy: ... })
			const messages = await redis.lrange(room, 0, 10);
			const parsed = messages.map((json) => JSON.parse(json));
			cb(parsed);
		});

		// socket.disconnect();
	});
};
