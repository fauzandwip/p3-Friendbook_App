const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { userTypeDefs, userResolvers } = require('./schemas/user');
const { MongoClient } = require('mongodb');

const uri =
	'mongodb+srv://fauzandp:<password>@cluster0.bg37y6c.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const server = new ApolloServer({
	typeDefs: [userTypeDefs],
	resolvers: [userResolvers],
	context: async () => {
		if (!client.connect()) client.connect();
		return {
			client: client.db('FacebookApp_p3'),
		};
	},
});

startStandaloneServer(server, {
	listen: { port: 3000 },
}).then(({ url }) => {
	console.log(`🚀  Server ready at: ${url}`);
});
