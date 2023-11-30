import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import Input from '../components/input/Input';

const Register = ({ navigation }) => {
	return (
		<SafeAreaView
			style={{
				...styles.container,
			}}
		>
			<View
				style={{
					display: 'flex',
					gap: 10,
					justifyContent: 'center',
					alignItems: 'center',
					width: '80%',
					// backgroundColor: 'red',
				}}
			>
				<Text
					style={{
						marginBottom: 70,
						fontSize: 30,
						color: '#1877f2',
						fontWeight: 'bold',
					}}
				>
					Friendbook
				</Text>

				<Input placeholder={'name'}></Input>
				<Input placeholder={'username'}></Input>
				<Input placeholder={'email'}></Input>
				<Input placeholder={'password'} secure={true}></Input>
				<TouchableOpacity
					style={{
						marginTop: 30,
						backgroundColor: '#1877f2',
						width: '100%',
						padding: 10,
						borderRadius: 20,
					}}
				>
					<Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
						Register
					</Text>
				</TouchableOpacity>
				<Text>or</Text>
				<Text
					style={{ fontSize: 16, color: '#1877f2', fontWeight: '500' }}
					onPress={() => navigation.navigate('Login')}
				>
					Already have an account
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default Register;
