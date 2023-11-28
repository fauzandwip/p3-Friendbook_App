const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

const connect = async () => {
	try {
		const database = client.db('FacebookApp_p3');
		db = database;
		return database;
	} catch (error) {
		console.log(error);
	}
};

const getDB = () => {
	return db;
};

module.exports = { connect, getDB };
