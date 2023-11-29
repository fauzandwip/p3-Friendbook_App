const { ObjectId } = require('mongodb');
const { getDB } = require('../config/mongo');

class User {
	static async addUser(user) {
		const users = getDB().collection('users');
		const response = await users.insertOne(user);
		const newUser = await users.findOne({ _id: response.insertedId });
		return newUser;
	}

	static async getUserById(id) {
		return await getDB()
			.collection('users')
			.findOne({ _id: new ObjectId(id) });
	}

	static async getUserByEmailOrUsername(email, username) {
		return await getDB()
			.collection('users')
			.findOne({
				$or: [{ email }, { username }],
			});
	}

	static async getUsersByNameOrUsername(name) {
		return await getDB()
			.collection('users')
			.find(
				{
					$or: [
						{ name: { $regex: name, $options: 'i' } },
						{ username: { $regex: name, $options: 'i' } },
					],
				},
				{
					password: 0,
				}
			)
			.toArray();
	}
}

module.exports = User;
