const { postTypeDefs, postResolvers } = require('./post');
const { userTypeDefs, userResolvers } = require('./user');

module.exports = {
	typeDefs: [userTypeDefs, postTypeDefs],
	resolvers: [userResolvers, postResolvers],
};
