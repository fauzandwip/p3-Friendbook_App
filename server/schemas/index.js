const { followTypeDefs, followResolvers } = require('./follow');
const { postTypeDefs, postResolvers } = require('./post');
const { userTypeDefs, userResolvers } = require('./user');

module.exports = {
	typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
	resolvers: [userResolvers, postResolvers, followResolvers],
};
