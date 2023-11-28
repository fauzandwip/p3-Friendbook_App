const jwt = require('jsonwebtoken');

const secretKey = 'jackkksparrrowww...';

module.exports = {
	signToken: (payload) => {
		return jwt.sign(payload, secretKey);
	},
};
