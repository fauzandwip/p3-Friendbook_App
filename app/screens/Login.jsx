import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import Input from '../components/Input';

const Login = ({ navigation, route }) => {
	console.log(route);
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
					onPress={() => {
						console.log(route.params.isLogin);
						route.params.setIsLogin(true);
					}}
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
