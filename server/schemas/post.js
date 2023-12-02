const { GraphQLError } = require('graphql');
const Post = require('../models/post');
const dateScalar = require('../helpers/dateScalar');
const redis = require('../config/redis');

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
    user: User
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

  # post with comments include user
   type PostDetail {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [CommentDetail]
    likes: [LikeDetail]
    createdAt: Date
    updatedAt: Date
  }

  type CommentDetail {
    content: String!
    authorId: ID!
    createdAt: Date
    updatedAt: Date
    user: UserInformation
  }

  type LikeDetail {
    authorId: ID!
    createdAt: Date
    updatedAt: Date
    user: UserInformation
  }

  type UserInformation {
    name: String
    username: String
  }

  input NewPost {
    content: String!
    tags: [String]
    imgUrl: String
  }

  type Query {
    posts: [Post]
    post(id: ID!): PostDetail
  }

  type Mutation {
    addPost(post: NewPost): Post
    addComment(postId: ID!, comment: String!): String
    addLike(postId: ID!): String
  }
`;

const postResolvers = {
	Date: dateScalar,
	Query: {
		posts: async (_, __, ctx) => {
			try {
				await ctx.authentication();
				const postsCache = await redis.get('post:all');

				if (postsCache) {
					console.log('from redis');
					return JSON.parse(postsCache);
				}

				const posts = await Post.getAllPost();
				await redis.set('post:all', JSON.stringify(posts));
				console.log('from mongodb');

				// console.dir(posts, { depth: null });
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
				// console.dir(post, { depth: null });
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
				await redis.del('post:all');
				console.log('invalidate cache');

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
		addLike: async (_, args, ctx) => {
			try {
				const user = await ctx.authentication();
				const { postId } = args;
				const post = await Post.getPostById(postId);

				if (!post) {
					throw new GraphQLError('Post not found', {
						extensions: { code: 'NOT_FOUND' },
					});
				}

				const isLiked = await Post.getLike(postId, user.id);

				if (isLiked) {
					throw new GraphQLError('You have liked', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				const { matchedCount } = await Post.addLike(postId, user.id);

				if (matchedCount) {
					return 'Success to like post';
				}

				return 'Failed to like post';
			} catch (error) {
				throw error;
			}
		},
	},
};

module.exports = { postTypeDefs, postResolvers };
