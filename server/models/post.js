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
			.aggregate([{ $sort: { createdAt: -1 } }])
			.toArray();
	}

	static async getPostById(id) {
		return await getDB()
			.collection('posts')
			.findOne({ _id: new ObjectId(id) });
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
							contents: comment,
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
