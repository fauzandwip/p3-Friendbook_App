const User = require('../models/user');
const usersData = [
	{
		_id: 1,
		name: 'Jack Sparrow',
		username: 'jack',
		email: 'jack@gmail.com',
		password: '12345',
	},
];

const userTypeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
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
    users: [User]
    user(id: ID): User
  }

  type Mutation {
    register(user: NewUser): User
    login(email: String!, password: String!): Token
  }
`;

const userResolvers = {
	Query: {
		users: () => usersData,
		user: async (_, args) => {
			try {
				const { id } = args;
				const user = await User.getUserById(id);

				return user;
			} catch (error) {
				throw error;
			}
		},
	},
	Mutation: {
		register: async (_, args) => {
			try {
				const { name, username, email, password } = args.user;
				const newUser = await User.register({
					name,
					username,
					email,
					password,
				});

				return newUser;
			} catch (error) {
				throw error;
			}
		},
		login: async (_, args) => {
			try {
				const { email, password } = args;
				const token = await User.login({
					email,
					password,
				});

				return token;
			} catch (error) {
				throw error;
			}
		},
	},
};

module.exports = { userTypeDefs, userResolvers };
