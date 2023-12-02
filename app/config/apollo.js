import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://5666-140-213-100-47.ngrok-free.app/',
	cache: new InMemoryCache(),
});

export default client;
