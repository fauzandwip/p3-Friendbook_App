const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { userTypeDefs, userResolvers } = require('./schemas/user');
const { MongoClient } = require('mongodb');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const uri = `mongodb+srv://fauzandp:${process.env.MONGODB_PW}@cluster0.bg37y6c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const server = new ApolloServer({
	typeDefs: [userTypeDefs],
	resolvers: [userResolvers],
});

startStandaloneServer(server, {
	listen: { port: 3000 },
	context: async () => {
		return {
			db: client.db('FacebookApp_p3'),
		};
	},
}).then(({ url }) => {
	console.log(`🚀  Server ready at: ${url}`);
});
