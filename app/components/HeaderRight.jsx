import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

const SearchButton = () => {
	const { navigate } = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigate('Search')}>
			<Icon name="search" size={24} />
		</TouchableOpacity>
	);
};

const SignOutButton = () => {
	const { logoutAction } = useContext(LoginContext);

	return (
		<TouchableOpacity onPress={() => logoutAction('access_token')}>
			<Icon name="sign-out" size={24} />
		</TouchableOpacity>
	);
};

const HeaderRight = () => {
	return (
		<>
			<View style={{ flexDirection: 'row', gap: 20 }}>
				<SearchButton />
				<SignOutButton />
			</View>
		</>
	);
};

export default HeaderRight;
