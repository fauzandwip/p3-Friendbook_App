const { GraphQLError } = require('graphql');
const dateScalar = require('../helpers/dateScalar');
const Follow = require('../models/follow');

const followTypeDefs = `#graphql
  scalar Date

  type Follow {
    _id: ID
    followingId: String
    followerId: String
    createdAt: Date
    updatedAt: Date
  }

  type Mutation {
    follow(userId: ID): Follow
  }
`;

const followResolvers = {
	Date: dateScalar,
	Mutation: {
		follow: async (_, args, ctx) => {
			try {
				const currentUser = await ctx.authentication();
				const { userId } = args;
				const isFollowed = await Follow.getFollow(userId, currentUser.id);

				if (isFollowed) {
					throw new GraphQLError('You have followed', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				const follow = await Follow.follow(userId, currentUser.id);
				return follow;
			} catch (error) {
				throw error;
			}
		},
	},
};

module.exports = { followTypeDefs, followResolvers };
