import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SearchButton = () => {
	const { navigate } = useNavigation();
	return (
		<TouchableOpacity onPress={() => navigate('DetailPost')}>
			<Icon name="search" size={24} />
		</TouchableOpacity>
	);
};

export default SearchButton;
