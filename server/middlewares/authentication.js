const { GraphQLError } = require('graphql');
const { ObjectId } = require('mongodb');
const { verifyToken } = require('../helpers/jwt');
const User = require('../models/user');

const authentication = async (req) => {
	try {
		let access_token = req.headers.authorization;

		if (!access_token) {
			throw new GraphQLError('Invalid token', {
				extensions: { code: 'UNAUTHENTICATED' },
			});
		}

		access_token = access_token.replace('Bearer ', '');
		const { id } = verifyToken(access_token);
		const user = await User.getUserById(id);

		if (!user) {
			throw new GraphQLError('Invalid token', {
				extensions: { code: 'UNAUTHENTICATED' },
			});
		}

		return {
			id: user._id,
			username: user.username,
			email: user.email,
		};
	} catch (error) {
		if (error.name === 'JsonWebTokenError') {
			throw new GraphQLError('Invalid token', {
				extensions: { code: 'UNAUTHENTICATED' },
			});
		}

		throw error;
	}
};

module.exports = authentication;
