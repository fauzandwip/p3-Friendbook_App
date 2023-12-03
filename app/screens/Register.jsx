import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import Input from '../components/Input';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const REGISTER = gql`
	mutation Register($user: NewUser) {
		register(user: $user) {
			_id
			name
			username
			email
		}
	}
`;

const Register = ({ navigation }) => {
	const [userInput, setUserInput] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
	});
	const [register, { data, loading, error }] = useMutation(REGISTER);

	const onChangeText = (text, key) => {
		setUserInput((prev) => ({ ...prev, [key]: text }));
	};

	const handleOnRegister = async () => {
		try {
			if (loading) return;
			const user = {
				name: userInput.name,
				username: userInput.username,
				email: userInput.email,
				password: userInput.password,
			};
			const response = await register({
				variables: { user },
			});
			// console.log(response, '>>> response');
			navigation.navigate('Login');
		} catch (error) {
			console.log(error);
		}
	};

	// console.log(JSON.stringify(error, null, 2));

	return (
		<View style={{ ...styles.container }}>
			<View
				style={{
					display: 'flex',
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
					placeholder={'name'}
					value={userInput.name}
					onChangeText={(text) => onChangeText(text, 'name')}
					name={'user'}
				/>
				<Input
					placeholder={'username'}
					value={userInput.username}
					onChangeText={(text) => onChangeText(text, 'username')}
					name={'user-circle-o'}
				/>
				<Input
					placeholder={'email'}
					value={userInput.email}
					onChangeText={(text) => onChangeText(text, 'email')}
					name={'envelope'}
				/>
				<Input
					placeholder={'password'}
					secure={true}
					value={userInput.password}
					onChangeText={(text) => onChangeText(text, 'password')}
					name={'lock'}
				/>
				{error && <Text style={{ color: 'red' }}>{error?.message}</Text>}

				<TouchableOpacity
					style={{
						marginTop: 30,
						marginBottom: 10,
						backgroundColor: '#1877f2',
						width: '100%',
						padding: 10,
						borderRadius: 20,
					}}
					onPress={handleOnRegister}
				>
					<Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
						Register
					</Text>
				</TouchableOpacity>
				<Text
					style={{ fontSize: 13, color: 'gray', fontWeight: '500' }}
					onPress={() => navigation.navigate('Login')}
				>
					You have account? <Text style={{ color: '#1877f2' }}>Login now</Text>
				</Text>
			</View>
		</View>
	);
};

export default Register;
