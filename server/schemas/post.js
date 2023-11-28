const { GraphQLError, GraphQLScalarType } = require('graphql');
const { ObjectId } = require('mongodb');
const Post = require('../models/post');

const postTypeDefs = `#graphql
  scalar Date

  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: Date
    updatedAt: Date
  }

  type Comment {
    content: String!
    authorId: ID!
    createdAt: Date
    updatedAt: Date
  }

  type Like {
    authorId: ID!
    createdAt: Date
    updatedAt: Date
  }


  input NewPost {
    content: String!
    tags: [String]
    imgUrl: String
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    addPost(post: NewPost): Post
  }
`;

const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	serialize(value) {
		return value.toISOString();
	},
	parseValue(value) {
		return new Date(value);
	},
});

const postResolvers = {
	Date: dateScalar,
	Query: {
		posts: async () => {
			try {
				const posts = await Post.getAllPost();
				return posts;
			} catch (error) {
				throw error;
			}
		},
	},
	Mutation: {
		addPost: async (_, args) => {
			try {
				const { content, tags, imgUrl } = args.post;
				if (!content) {
					throw new GraphQLError('Content is required', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				const authorId = new ObjectId('6565c48a2e6e47d2a7f730b0');
				const currentTime = new Date();
				const newPost = await Post.addPost({
					content,
					tags,
					imgUrl,
					authorId,
					comments: [],
					likes: [],
					createdAt: currentTime,
					updatedAt: currentTime,
				});
				return newPost;
			} catch (error) {
				throw error;
			}
		},
	},
};

module.exports = { postTypeDefs, postResolvers };
