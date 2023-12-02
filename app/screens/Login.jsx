import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import Input from '../components/Input';
import { gql, useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { LoginContext } from '../context/LoginContext';

const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			access_token
		}
	}
`;

const Login = ({ navigation }) => {
	const { loginAction } = useContext(LoginContext);
	const [userInput, setUserInput] = useState({
		email: 'jack@gmail.com',
		password: '12345',
	});
	const [login, { data, loading, error }] = useMutation(LOGIN);

	const onChangeText = (text, key) => {
		setUserInput((prev) => ({ ...prev, [key]: text }));
	};

	const handleOnLogin = async () => {
		try {
			if (loading) return;
			const response = await login({
				variables: { email: userInput.email, password: userInput.password },
			});
			// console.log(response.data.login.access_token, 'response');
			await loginAction('access_token', response.data.login.access_token);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={{ ...styles.container }}>
			<View
				style={{
					gap: 10,
					justifyContent: 'center',
					alignItems: 'center',
					width: '80%',
				}}
			>
				<Text
					style={{
						marginBottom: 40,
						fontSize: 40,
						color: '#1877f2',
						fontWeight: 'bold',
					}}
				>
					friendbook
				</Text>

				<Input
					placeholder={'email'}
					value={userInput.email}
					onChangeText={(text) => onChangeText(text, 'email')}
				/>
				<Input
					placeholder={'password'}
					secure={true}
					value={userInput.password}
					onChangeText={(text) => onChangeText(text, 'password')}
				/>
				<TouchableOpacity
					style={{
						marginTop: 30,
						marginBottom: 10,
						backgroundColor: '#1877f2',
						width: '100%',
						padding: 10,
						borderRadius: 20,
					}}
					onPress={handleOnLogin}
				>
					<Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
						Login
					</Text>
				</TouchableOpacity>
				<Text
					style={{ fontSize: 13, color: 'gray', fontWeight: '500' }}
					onPress={() => navigation.navigate('Register')}
				>
					Don't have account?{' '}
					<Text style={{ color: '#1877f2' }}>Create an account</Text>
				</Text>
			</View>
		</View>
	);
};

export default Login;
