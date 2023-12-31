const { GraphQLError } = require('graphql');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const User = require('../models/user');
const { signToken } = require('../helpers/jwt');

const userTypeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
  }

  type UserDetail {
    _id: ID
    name: String
    username: String
    email: String
    following: [FollowDetail]
    followers: [FollowDetail]
  }

  type FollowDetail {
    _id: ID
    followingId: String
    followerId: String
    user: UserInformation
  }

  input NewUser {
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Token {
    access_token: String
  }
  
  type Query {
    user: UserDetail
    usersByName(name: String!): [User]
  }

  type Mutation {
    register(user: NewUser): User
    login(email: String!, password: String!): Token
  }
`;

const userResolvers = {
	Query: {
		user: async (_, __, ctx) => {
			try {
				const currentUser = await ctx.authentication();
				const user = await User.getUserById(currentUser.id);
				// console.dir(user, { depth: null });
				return user;
			} catch (error) {
				throw error;
			}
		},
		usersByName: async (_, args, ctx) => {
			try {
				await ctx.authentication();
				const { name } = args;
				if (!name) {
					return [];
				}

				const users = await User.getUsersByNameOrUsername(name);
				return users;
			} catch (error) {
				throw error;
			}
		},
	},
	Mutation: {
		register: async (_, args) => {
			try {
				const { name, username, email, password } = args.user;

				if (!username) {
					throw new GraphQLError('Username is required', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				if (!email) {
					throw new GraphQLError('Email is required', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				if (!password) {
					throw new GraphQLError('Password is required', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				if (!email.includes('@')) {
					throw new GraphQLError('Invalid email format', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				if (password.length < 5) {
					throw new GraphQLError('Password must be more than 5 characters', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				const user = await User.getUserByEmailOrUsername(email, username);

				if (user) {
					if (user.email === email) {
						throw new GraphQLError('Email already exists', {
							extensions: { code: 'BAD_USER_INPUT' },
						});
					}

					if (user.username === username) {
						throw new GraphQLError('Username must be unique', {
							extensions: { code: 'BAD_USER_INPUT' },
						});
					}
				}

				const newUser = await User.addUser({
					name,
					username,
					email,
					password: hashPassword(password),
				});

				return newUser;
			} catch (error) {
				throw error;
			}
		},
		login: async (_, args) => {
			try {
				const { email, password } = args;
				const user = await User.getUserByEmailOrUsername(email);

				if (!user || !comparePassword(password, user.password)) {
					throw new GraphQLError('Invalid email/password', {
						extensions: { code: 'BAD_USER_INPUT' },
					});
				}

				return {
					access_token: signToken({
						id: user._id,
						email: user.email,
					}),
				};
			} catch (error) {
				throw error;
			}
		},
	},
};

module.exports = { userTypeDefs, userResolvers };
