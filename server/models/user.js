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
}

module.exports = User;
