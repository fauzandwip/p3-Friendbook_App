const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://fauzandp:${process.env.MONGODB_PASSWORD}@cluster0.bg37y6c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const connect = async () => {
	try {
		return client.db('FacebookApp_p3');
	} catch (error) {
		console.log(error);
	}
};

module.exports = { connect };
