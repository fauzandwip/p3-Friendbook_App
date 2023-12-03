import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: 'https://server-p3w1.fauzandp.online/',
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
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'network-only',
		},
		query: {
			fetchPolicy: 'network-only',
		},
	},
});

export default client;
