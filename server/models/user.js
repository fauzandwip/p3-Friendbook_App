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
		const arrUser = await getDB()
			.collection('users')
			.aggregate([
				{ $match: { _id: new ObjectId(id) } },
				{
					$lookup: {
						from: 'follows',
						foreignField: 'followerId',
						localField: '_id',
						as: 'following',
					},
				},
				{ $unwind: '$following' },
				{
					$lookup: {
						from: 'users',
						foreignField: '_id',
						localField: 'following.followingId',
						let: {
							followingId: '$following.followingId',
							following: '$following',
						},
						pipeline: [
							{ $match: { $expr: { $eq: ['$_id', '$$followingId'] } } },
							{
								$project: {
									_id: 0,
									user: {
										name: '$$ROOT.name',
										username: '$$ROOT.username',
									},
								},
							},
							{
								$replaceRoot: {
									newRoot: { $mergeObjects: ['$$following', '$$ROOT'] },
								},
							},
						],
						as: 'following',
					},
				},
				{
					$group: {
						_id: '$_id',
						name: { $first: '$name' },
						username: { $first: '$username' },
						email: { $first: '$email' },
						following: {
							$push: { $first: '$following' },
						},
					},
				},
				{
					$lookup: {
						from: 'follows',
						foreignField: 'followingId',
						localField: '_id',
						as: 'followers',
					},
				},
				{ $unwind: '$followers' },
				{
					$lookup: {
						from: 'users',
						foreignField: '_id',
						localField: 'followers.followerId',
						let: {
							followerId: '$followers.followerId',
							followers: '$followers',
						},
						pipeline: [
							{ $match: { $expr: { $eq: ['$_id', '$$followerId'] } } },
							{
								$project: {
									_id: 0,
									user: {
										name: '$$ROOT.name',
										username: '$$ROOT.username',
									},
								},
							},
							{
								$replaceRoot: {
									newRoot: { $mergeObjects: ['$$followers', '$$ROOT'] },
								},
							},
						],
						as: 'followers',
					},
				},
				{
					$group: {
						_id: '$_id',
						name: { $first: '$name' },
						username: { $first: '$username' },
						email: { $first: '$email' },
						following: { $first: '$following' },
						followers: {
							$push: { $first: '$followers' },
						},
					},
				},
			])
			.toArray();
		return arrUser[0];
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
