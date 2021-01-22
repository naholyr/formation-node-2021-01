'use strict';

const app = require('../app');
const request = require('supertest');

// Fake values
const mockFibo = jest.fn().mockImplementation((n) => {
	if (n === 10) return 55;
	if (n === 100) return 99999999;
	return 42;
});

jest.mock('../lib/fibo', () => {
	return (n) => mockFibo(n);
});

beforeEach(() => mockFibo.mockClear());

test('/fibo/10 (equal)', async () => {
	const { body, headers } = await request(app).get('/fibo/10');
	expect(headers['content-type']).toEqual('application/json; charset=utf-8');
	expect(body).toEqual({ input: 10, result: 55 });
	expect(mockFibo).toHaveBeenCalledTimes(1);
});

test('/fibo/10 (snapshot)', async () => {
	const { body } = await request(app).get('/fibo/11');
	expect(mockFibo).toHaveBeenCalledTimes(1);
	expect(body).toMatchSnapshot();
});

test('/fibo/100 (testing mock)', async () => {
	const {
		body: { result },
	} = await request(app).get('/fibo/100');
	expect(mockFibo).toHaveBeenCalledWith(100);
	expect(result).toEqual(99999999);
});
