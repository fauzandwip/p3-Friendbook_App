const { getDB } = require('../config/mongo');
class Post {
	static async addPost(post) {
		const posts = getDB().collection('posts');
		const response = await posts.insertOne(post);
		const newPost = await posts.findOne({ _id: response.insertedId });
		return newPost;
	}

	static async getAllPost() {
		return getDB()
			.collection('posts')
			.aggregate([{ $sort: { createdAt: -1 } }])
			.toArray();
	}
}

module.exports = Post;
