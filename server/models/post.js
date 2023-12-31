const { getDB } = require('../config/mongo');
const { ObjectId } = require('mongodb');
class Post {
	static async addPost(post) {
		const currentTime = new Date();
		const posts = getDB().collection('posts');
		const response = await posts.insertOne({
			...post,
			comments: [],
			likes: [],
			createdAt: currentTime,
			updatedAt: currentTime,
		});
		const newPost = await posts.findOne({ _id: response.insertedId });
		return newPost;
	}

	static async getAllPost() {
		return await getDB()
			.collection('posts')
			.aggregate([
				{
					$sort: { createdAt: -1 },
				},
				{
					$lookup: {
						from: 'users',
						foreignField: '_id',
						localField: 'authorId',
						as: 'user',
						pipeline: [
							{
								$project: { password: 0 },
							},
						],
					},
				},
				{
					$unwind: '$user',
				},
			])
			.toArray();
	}

	static async getPostById(id) {
		console.log(id);

		const arrPost = await getDB()
			.collection('posts')
			.aggregate([
				{ $match: { _id: new ObjectId(id) } },
				{ $unwind: { path: '$comments', preserveNullAndEmptyArrays: true } },
				{
					$lookup: {
						from: 'users',
						foreignField: '_id',
						localField: 'comments.authorId',
						let: {
							cAuthorId: '$comments.authorId',
							comments: '$comments',
						},
						pipeline: [
							{ $match: { $expr: { $eq: ['$_id', '$$cAuthorId'] } } },
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
									newRoot: { $mergeObjects: ['$$comments', '$$ROOT'] },
								},
							},
						],
						as: 'comments',
					},
				},
				{
					$group: {
						_id: '$_id',
						content: { $first: '$content' },
						tags: { $first: '$tags' },
						imgUrl: { $first: '$imgUrl' },
						authorId: { $first: '$authorId' },
						comments: {
							$push: { $first: '$comments' },
						},
						likes: { $first: '$likes' },
						createdAt: { $first: '$createdAt' },
						updatedAt: { $first: '$updatedAt' },
					},
				},
				{ $unwind: { path: '$likes', preserveNullAndEmptyArrays: true } },
				{
					$lookup: {
						from: 'users',
						foreignField: '_id',
						localField: 'likes.authorId',
						let: {
							likeAuthorId: '$likes.authorId',
							likes: '$likes',
						},
						pipeline: [
							{ $match: { $expr: { $eq: ['$_id', '$$likeAuthorId'] } } },
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
									newRoot: { $mergeObjects: ['$$likes', '$$ROOT'] },
								},
							},
						],
						as: 'likes',
					},
				},
				{
					$lookup: {
						from: 'users',
						foreignField: '_id',
						localField: 'authorId',
						pipeline: [
							{
								$project: {
									password: 0,
								},
							},
						],
						as: 'user',
					},
				},
				{
					$unwind: '$user',
				},
				{
					$group: {
						_id: '$_id',
						content: { $first: '$content' },
						tags: { $first: '$tags' },
						imgUrl: { $first: '$imgUrl' },
						authorId: { $first: '$authorId' },
						comments: {
							$first: '$comments',
						},
						likes: {
							$push: { $first: '$likes' },
						},
						createdAt: { $first: '$createdAt' },
						updatedAt: { $first: '$updatedAt' },
						user: { $first: '$user' },
					},
				},
			])
			.toArray();

		const post = arrPost[0];
		return post;
	}

	static async addComment(postId, comment, authorId) {
		const currentTime = new Date();
		return await getDB()
			.collection('posts')
			.updateOne(
				{ _id: new ObjectId(postId) },
				{
					$push: {
						comments: {
							content: comment,
							authorId,
							createdAt: currentTime,
							updatedAt: currentTime,
						},
					},
				}
			);
	}

	static async addLike(postId, authorId) {
		const currentTime = new Date();
		return await getDB()
			.collection('posts')
			.updateOne(
				{ _id: new ObjectId(postId) },
				{
					$push: {
						likes: {
							authorId,
							createdAt: currentTime,
							updatedAt: currentTime,
						},
					},
				}
			);
	}

	static async getLikes(postId) {
		const post = await getDB()
			.collection('posts')
			.findOne({
				_id: new ObjectId(postId),
			});

		return post.likes;
	}

	static async getLike(postId, authorId) {
		const likes = await this.getLikes(postId);
		const like = await likes.find(
			(el) => el.authorId.toString() === authorId.toString()
		);

		return like;
	}
}

module.exports = Post;
