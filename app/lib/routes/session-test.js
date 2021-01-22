'use strict';

const status = (req, res) => {
	if (!req.session.username) {
		res.send('You are not logged in');
	} else {
		res.send(
			'You are logged in as ' +
				req.session.username +
				' (session id = ' +
				req.session.id +
				')'
		);
	}
};

const login = (req, res) => {
	// req.session = object
	req.session.username = req.params.login;
	res.send('OK'); // res.end = save serialized session
};

const logout = (req, res) => {
	req.session.username = null;
	res.send('OK');
};

module.exports = { status, login, logout };
