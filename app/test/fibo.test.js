'use strict';

const fibo = require('../lib/fibo');
const fiboAsync = require('../lib/fibo-worker-2/master');

// beforeAll(() => console.log('before all tests'));
// afterAll(() => console.log('before all tests'));
// beforeEach(() => console.log('before each tests'));
// afterEach(() => console.log('before each tests'));

describe('Fibo', () => {
	test('fibo(5) === 5', () => {
		expect(fibo(5)).toEqual(5);
	});

	[
		// [input, expectedOutput]
		[0, 0],
		[1, 1],
		[2, 1],
		[3, 2],
		[4, 3],
		[5, 5],
		[6, 8],
	].forEach(([n, result]) =>
		test(`fibo(${n}) === ${result}`, () => {
			expect(fibo(n)).toEqual(result);
		})
	);

	test('Async fibo', async () => {
		const promise = fiboAsync(6);
		expect(promise.then).toBeInstanceOf(Function);
		expect(promise.catch).toBeInstanceOf(Function);
		const result = await promise;
		expect(result).toEqual(8);
	});
});
