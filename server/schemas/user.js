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
`;

const userResolvers = {
	Query: {
		users: () => usersData,
	},
};

module.exports = { userTypeDefs, userResolvers };
