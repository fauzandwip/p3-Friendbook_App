const { hashPassword } = require('../helpers/bcrypt');
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
  
  type Query {
    users: [User]
    user(id: ID): User
  }

  type Mutation {
    register(user: NewUser): User
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
				console.log(args);
				const { name, username, email, password } = args.user;
				const newUser = await User.register({
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
	},
};

module.exports = { userTypeDefs, userResolvers };
