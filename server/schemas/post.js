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
    post(id: ID): Post
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
		posts: async (_, __, ctx) => {
			try {
				await ctx.authentication();
				const posts = await Post.getAllPost();
				return posts;
			} catch (error) {
				throw error;
			}
		},
		post: async (_, args, ctx) => {
			try {
				await ctx.authentication();
				const { id } = args;
				const post = await Post.getPostById(id);

				if (!post) {
					throw new GraphQLError('Post not found', {
						extensions: { code: 'NOT_FOUND' },
					});
				}

				return post;
			} catch (error) {
				throw error;
			}
		},
	},
	Mutation: {
		addPost: async (_, args, ctx) => {
			try {
				const user = await ctx.authentication();
				const { content, tags, imgUrl } = args.post;
				if (!content) {
					throw new GraphQLError('Content is required', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				const authorId = user.id;
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
