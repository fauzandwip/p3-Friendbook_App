if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { userTypeDefs, userResolvers } = require('./schemas/user');
const { connect } = require('./config/mongo');

const server = new ApolloServer({
	typeDefs: [userTypeDefs],
	resolvers: [userResolvers],
});

connect()
	.then(() => {
		return startStandaloneServer(server, {
			listen: { port: 3000 },
		});
	})
	.then(({ url }) => {
		console.log(`🚀  Server ready at: ${url}`);
	});
