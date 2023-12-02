if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs, resolvers } = require('./schemas');
const { connect } = require('./config/mongo');
const authentication = require('./middlewares/authentication');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
});

connect()
	.then(() => {
		return startStandaloneServer(server, {
			listen: { port: 3000 },
			context: async ({ req }) => {
				return {
					authentication: () => authentication(req),
				};
			},
		});
	})
	.then(({ url }) => {
		console.log(`🚀  Server ready at: ${url}`);
	});
