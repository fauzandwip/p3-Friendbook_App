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
  }

  type Mutation {
    register(name: String, username: String, email: String, password: String,): User
  }
`;

const userResolvers = {
	Query: {
		users: () => usersData,
	},
	Mutation: {
		register: async (_, args, ctx) => {
			// console.log(args, '>>> args');
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
