const { GraphQLError } = require('graphql');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/mongo');
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class User {
	static async register({ name, username, email, password }) {
		const users = getDB().collection('users');
		const user = await users.findOne({
			$or: [{ email }, { username }],
		});

		if (user) {
			if (user.email === email) {
				throw new GraphQLError('Email already exists', {
					extensions: { code: 'BAD_USER_INPUT' },
				});
			}

			if (user.username === username) {
				throw new GraphQLError('Username must be unique', {
					extensions: { code: 'BAD_USER_INPUT' },
				});
			}
		}

		const response = await users.insertOne({
			name,
			username,
			email,
			password: hashPassword(password),
		});

		const newUser = await users.findOne({ _id: response.insertedId });
		return newUser;
	}

	static async login({ email, password }) {
		const user = await getDB().collection('users').findOne({ email });

		if (!user || !comparePassword(password, user.password)) {
			throw new GraphQLError('Invalid email/password', {
				extensions: { code: 'BAD_USER_INPUT' },
			});
		}

		return {
			access_token: signToken({
				id: user._id,
				email: user.email,
			}),
		};
	}

	static async getUserById(id) {
		if (!id) {
			throw new GraphQLError('User not found');
		}
		const users = getDB().collection('users');
		const user = await users.findOne({ _id: new ObjectId(id) });
		return user;
	}
}

module.exports = User;
