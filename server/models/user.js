const { GraphQLError } = require('graphql');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/mongo');
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class User {
	static async addUser(user) {
		const users = getDB().collection('users');
		const response = await users.insertOne(user);
		const newUser = await users.findOne({ _id: response.insertedId });
		return newUser;
	}

	static async getUserByEmailOrUsername(email, username) {
		return await getDB()
			.collection('users')
			.findOne({
				$or: [{ email }, { username }],
			});
	}

	static async getUserById(id) {
		return await getDB()
			.collection('users')
			.findOne({ _id: new ObjectId(id) });
	}
}

module.exports = User;
