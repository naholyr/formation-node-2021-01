'use strict';

const { fork } = require('child_process');

const childs = [
	fork(`${__dirname}/worker.js`),
	fork(`${__dirname}/worker.js`),
	fork(`${__dirname}/worker.js`),
	fork(`${__dirname}/worker.js`),
	fork(`${__dirname}/worker.js`),
	fork(`${__dirname}/worker.js`),
	fork(`${__dirname}/worker.js`),
];

module.exports = (n) => {
	// TODO round-robbin
	// TODO handle load myself (we know which child is computing what)
	// TODO generic-pool ?
	const child = childs[Math.floor(Math.random() * childs.length)];
	return new Promise((resolve) => {
		const id = Math.random();
		child.send({ input: n, id });
		const handler = ({ output, id: _id }) => {
			if (_id === id) {
				child.removeListener('message', handler);
				resolve(output);
			}
		};
		child.on('message', handler);
	});
};
