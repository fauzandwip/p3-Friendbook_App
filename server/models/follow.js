const { ObjectId } = require('mongodb');
const { GraphQLError } = require('graphql');
const { getDB } = require('../config/mongo');

class Follow {
	static async getFollow(followingId, followerId) {
		return await getDB()
			.collection('follows')
			.findOne({
				followingId: new ObjectId(followingId),
				followerId,
			});
	}

	static async follow(userId, currentUserId) {
		const currentTime = new Date();

		const follows = getDB().collection('follows');
		const response = await follows.insertOne({
			followingId: new ObjectId(userId),
			followerId: currentUserId,
			createdAt: currentTime,
			updatedAt: currentTime,
		});

		return await follows.findOne({ _id: response.insertedId });
	}
}

module.exports = Follow;
