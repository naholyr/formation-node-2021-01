'use strict';

const home = (req, res) => {
	// send + string = text/html
	// send + buffer = application/octet-stream
	// send + object = application/json
	res.send('coucou'); // write + end
};

module.exports = home;
