const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

module.exports = {
	signToken: (payload) => {
		return jwt.sign(payload, secretKey);
	},
	verifyToken: (token) => {
		return jwt.verify(token, secretKey);
	},
};
