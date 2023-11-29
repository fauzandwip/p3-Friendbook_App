const { GraphQLError } = require('graphql');
const Post = require('../models/post');
const dateScalar = require('../helpers/dateScalar');

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
    post(id: ID!): Post
  }

  type Mutation {
    addPost(post: NewPost): Post
    addComment(postId: ID!, comment: String!): String
  }
`;

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
				const newPost = await Post.addPost({
					content,
					tags,
					imgUrl,
					authorId,
				});
				return newPost;
			} catch (error) {
				throw error;
			}
		},
		addComment: async (_, args, ctx) => {
			try {
				const user = await ctx.authentication();
				const { postId, comment } = args;
				const post = await Post.getPostById(postId);

				if (!post) {
					throw new GraphQLError('Post not found', {
						extensions: { code: 'NOT_FOUND' },
					});
				}

				if (!comment) {
					throw new GraphQLError('Content is required', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				const { matchedCount } = await Post.addComment(
					postId,
					comment,
					user.id
				);

				if (matchedCount) {
					return 'Success to add comment';
				}

				return 'Failed to add comment';
			} catch (error) {
				throw error;
			}
		},
	},
};

module.exports = { postTypeDefs, postResolvers };
