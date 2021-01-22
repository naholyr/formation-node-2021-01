'use strict';

const app = require('../app');
const homeHandler = require('../lib/routes/home');
const request = require('supertest');

test('/ (express)', async () => {
	// expect 200
	const { statusCode /* body, headers */ } = await request(app).get('/');
	expect(statusCode).toEqual(200);
});

test('/ (handler)', async () => {
	const req = {};
	const res = {
		send: jest.fn(),
	};
	await homeHandler(req, res);
	expect(res.send).toHaveBeenCalled();
	expect(res.send).toHaveBeenCalledTimes(1);
	expect(res.send).toHaveBeenCalledWith('coucou');
});
