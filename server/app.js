const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { userTypeDefs, userResolvers } = require('./schemas/user');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const { connect } = require('./helpers/mongo');

const server = new ApolloServer({
	typeDefs: [userTypeDefs],
	resolvers: [userResolvers],
});

const run = async () => {
	try {
		const db = await connect();
		const { url } = await startStandaloneServer(server, {
			listen: { port: 3000 },
			context: async () => {
				return {
					db,
				};
			},
		});
		console.log(`🚀  Server ready at: ${url}`);
	} catch (error) {
		console.log(error);
	}
};

run();
