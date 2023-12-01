import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import Input from '../components/Input';

const Register = ({ navigation }) => {
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
						marginBottom: 50,
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
						marginBottom: 10,
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
