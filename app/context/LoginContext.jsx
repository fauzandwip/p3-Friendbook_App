const { createContext, useState, useEffect } = require('react');
import * as SecureStore from 'expo-secure-store';

export const LoginContext = createContext();

const getValueFor = async (key) => {
	return await SecureStore.getItemAsync(key);
};

export const LoginContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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

	// console.log(isLoggedIn);

	return (
		<LoginContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, loginAction, logoutAction }}
		>
			{children}
		</LoginContext.Provider>
	);
};
