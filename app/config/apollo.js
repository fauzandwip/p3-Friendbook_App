import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: 'https://5666-140-213-100-47.ngrok-free.app/',
});

const authLink = setContext(async (_, { headers, ...context }) => {
	const token = await SecureStore.getItemAsync('access_token');
	// console.log(token, '>>> token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
		context,
	};
});
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
