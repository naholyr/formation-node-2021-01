/*
exports.truc = 'bidule';
exports.tata = 'toto';
*/

/*
module.exports.truc = 'bidule';
module.exports.tata = 'toto';
*/

/*
module.exports = {
	truc: 'bidule',
	toto: 'tata',
};

// Nope, ça ne cohabite pas
exports.chose = 'machin';
*/

const fibo = (n) => (n === 0 ? 0 : n === 1 ? 1 : fibo(n - 1) + fibo(n - 2));

module.exports = fibo;
