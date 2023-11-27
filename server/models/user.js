const { ObjectId } = require('mongodb');

class User {
	static async register(db, data) {
		try {
			const coll = db.collection('users');
			const result = await coll.insertOne(data);

			const newUser = await coll.findOne({ _id: result.insertedId });
			return newUser;
		} catch (error) {
			console.log(error);
		}
	}
	static async getUserById(db, id) {
		try {
			const coll = db.collection('users');
			const user = await coll.findOne({ _id: new ObjectId(id) });
			return user;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = User;
