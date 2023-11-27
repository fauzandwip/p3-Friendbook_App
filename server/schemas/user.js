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
  
  type Query {
    users: [User]
    user(id: ID): User
  }

  type Mutation {
    register(name: String, username: String, email: String, password: String,): User
  }
`;

const userResolvers = {
	Query: {
		users: () => usersData,
		user: async (_, args, ctx) => {
			const { id } = args;
			const user = await User.getUserById(ctx.db, id);
			return user;
		},
	},
	Mutation: {
		register: async (_, args, ctx) => {
			const { name, username, email, password } = args;
			const newUser = await User.register(ctx.db, {
				name,
				username,
				email,
				password,
			});
			return newUser;
		},
	},
};

module.exports = { userTypeDefs, userResolvers };
