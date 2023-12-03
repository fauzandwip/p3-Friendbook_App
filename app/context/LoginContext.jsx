const { createContext, useState, useEffect } = require('react');
import * as SecureStore from 'expo-secure-store';
import { gql, useQuery } from '@apollo/client';

export const LoginContext = createContext();

const getValueFor = async (key) => {
	return await SecureStore.getItemAsync(key);
};

const GET_USER_BY_ID = gql`
	query User {
		user {
			_id
			email
			name
			username
		}
	}
`;

export const LoginContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { data: currentUser } = useQuery(GET_USER_BY_ID);

	const loginAction = async (key, value) => {
		try {
			await SecureStore.setItemAsync(key, value);
			setIsLoggedIn(true);
		} catch (error) {
			console.log(error);
		}
	};

	const logoutAction = async (key) => {
		try {
			await SecureStore.deleteItemAsync(key);
			setIsLoggedIn(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getValueFor('access_token').then((data) => {
			if (data) {
				setIsLoggedIn(true);
			}
		});
	}, []);

	console.log(currentUser, '>>> CURRENT USER');
	// console.log(isLoggedIn);

	return (
		<LoginContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				loginAction,
				logoutAction,
				currentUser: currentUser?.user,
			}}
		>
			{children}
		</LoginContext.Provider>
	);
};
