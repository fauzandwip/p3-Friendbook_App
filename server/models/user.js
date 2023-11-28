const { GraphQLError } = require('graphql');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/mongo');

class User {
	static async register(data) {
		const coll = getDB().collection('users');
		const response = await coll.insertOne(data);

		const newUser = await coll.findOne({ _id: response.insertedId });
		return newUser;
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
