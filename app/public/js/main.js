'use strict';

/* globals $:readonly, dateFns:readonly, io:readonly */

// En prod avec webpack:
// import io from 'socket.io-client';
// import $ from 'jquery';
// etc…

(() => {
	/**
	 * INIT (to be implemented with websocket interactions)
	 */

	let currentUsername = null;
	let activeRoom = null;
	let badgeValue = new Map();

	// socket = connection to server
	let socket;
	const connect = (username) => {
		if (socket) {
			// FIXME in case of bug and calling this twice, remove all listeners
		}

		socket = io(
			// Handshake data
			{ auth: { username } }
		);

		socket.on('logged-in', (username) => {
			console.log('%s logged in', username);
		});

		// TODO WS: on received message, add it to current room OR increment badge value
		socket.on('recv-message', (data) => {
			addMessage(data);
		});

		// TODO WS: on system event, show it
	};

	const login = (username) => {
		connect(username);
		// socket connection refused
		socket.on('connect_error', () => {
			console.error('connection refused');
		});
		// socket connected successfully
		socket.on('connect', () => {
			currentUsername = username;
			localStorage.setItem('username', username);
			$('.txt-username').text(username);
			// Initial rooms
			clearRooms();
			addRoom('(system)', { closable: false, badge: false });
			addRoom('@' + username, { closable: false });
			addRoom('#general');
			select('#general');
			// Update UI
			$('#step-1').hide();
			$('#step-2').show();
			$('#step-2 input').focus();
		});
		// on server's disconnect
		socket.on('disconnect', () => {
			console.log('disconnected');
		});
	};

	const send = (message) => {
		socket.emit('send-message', message, activeRoom);
		// No UI update, we'll receive "recv-message"
	};

	const select = (room) => {
		// TODO WS: get messages (latest X messages, from least to most recent)
		const messages = [
			{
				system: true,
				room,
				message: 'a rejoint ' + room,
				username: 'Bob',
				date: Date.now() - 400000,
			},
			{
				system: true,
				room,
				message: 'a rejoint ' + room,
				username: 'John',
				date: Date.now() - 390000,
			},
			{
				room,
				message: 'coucou tout le monde !',
				username: 'Bob',
				date: Date.now() - 360000,
			},
			{
				room,
				message: 'salut Bob :D',
				username: 'John',
				date: Date.now() - 300000,
			},
			{
				room: '@' + currentUsername,
				message: 'coucou',
				username: 'Bob (en mode harceleur)',
				date: Date.now() - 26000,
			},
		];
		// Update UI
		setActiveRoom(room);
		clearRoomBadge(room);
		clearMessages();
		messages.forEach(addMessage);
	};

	const join = (room) => {
		socket.emit('join-room', room);
		// Update UI
		addRoom(room);
		select(room);
	};

	const leave = (room) => {
		socket.emit('leave-room', room);
		// Update UI
		if (activeRoom === room) {
			clearMessages();
			if (room !== '#general') {
				select('#general');
			}
		}
		removeRoom(room);
	};

	/**
	 * UI: MESSAGES
	 */

	const clearMessages = () => {
		$('#messages-container').empty();
	};

	const escape = (string) =>
		string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

	const shortTime = (time) => dateFns.format(new Date(time), 'HH:mm');

	const fullTime = (time) =>
		dateFns.format(new Date(time), 'YYYY-MM-DD HH:mm:ss');

	const addMessage = ({ room, message, username, date, system }) => {
		if (room && activeRoom !== room) {
			incrRoomBadge(room);
			return;
		}

		if (!room && system && activeRoom !== '(system)') {
			incrRoomBadge('(system)');
			return;
		}

		const html = `<div class="row ${system ? 'text-muted' : 'bg-light'} py-2">
			<small class="col-auto text-secondary" title="${fullTime(date)}">${shortTime(
			date
		)}</small>
			${
				system
					? `<span class="col text-wrap"><a href="#" class="text-secondary">@<strong>${escape(
							username
					  )}</strong></a> ${escape(message)}</span>`
					: `<a href="#" title="${escape(
							username
					  )}" class="col-sm-2 text-truncate">@<strong>${escape(
							username
					  )}</strong></a>
				<span class="col text-wrap">${escape(message)}</span>`
			}
		</div>`;
		$('#messages-container').prepend(html);
	};

	/**
	 * UI: ROOMS
	 */

	const addRoom = (room, { closable = true } = {}) => {
		const html = `<li class="nav-item d-flex" data-room="${room}">
			${
				closable
					? `<button type="button" class="close pr-3" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>`
					: ''
			}
			<button class="btn nav-link flex-grow-1">
				${room}
				<span class="badge badge-primary badge-pill" style="display:none">0</span>
			</button>
		</li>`;
		$('#rooms-container').append(html);
	};

	const setActiveRoom = (room) => {
		$(`#rooms-container [data-room] .nav-link`).removeClass('active');
		$(`#rooms-container [data-room="${room}"] .nav-link`).addClass('active');
		activeRoom = room;
		$('#action-post-to').text('Post to ' + room);
		$('#post-form [name="message"]').focus();
	};

	const incrRoomBadge = (room) => {
		const $badge = $(`#rooms-container [data-room="${room}"] .badge`);
		if ($badge.length) {
			// No badge in DOM = room created without badge feature
			const value = (badgeValue.get(room) || 0) + 1;
			badgeValue.set(room, value);
			$badge.text(value).show();
		}
	};

	const clearRoomBadge = (room) => {
		const $badge = $(`#rooms-container [data-room="${room}"] .badge`);
		if ($badge.length) {
			badgeValue.delete(room);
			$badge.hide();
		}
	};

	const removeRoom = (room) => {
		clearRoomBadge(room);
		$(`#rooms-container [data-room="${room}"]`).remove();
	};

	const clearRooms = () => {
		$('#rooms-container').empty();
		badgeValue.clear();
	};

	/**
	 * EVENT HANDLERS
	 */

	$('#login-form').on('submit', (e) => {
		e.preventDefault();
		login(e.target.elements.username.value);
	});

	$('#post-form [name="action"]').on('change', () => {
		$('#post-form [name="message"]').focus();
	});

	$('#post-form').on('submit', (e) => {
		e.preventDefault();
		if (e.target.elements.action.value === 'send') {
			send(e.target.elements.message.value);
			e.target.elements.message.value = '';
		} else if (e.target.elements.action.value === 'join') {
			join('#' + e.target.elements.message.value);
			e.target.elements.message.value = '';
			e.target.elements.action.value = 'send';
		}
	});

	$('#rooms-container').on('click', '.close', (e) => {
		e.preventDefault();
		const room = $(e.target).closest('[data-room]').data('room');
		leave(room);
	});

	$('#rooms-container').on('click', '.nav-link', (e) => {
		e.preventDefault();
		const room = $(e.target).closest('[data-room]').data('room');
		select(room);
	});

	// Auto-login
	const storedUsername = localStorage.getItem('username');
	if (storedUsername) {
		login(storedUsername);
	}
})();
