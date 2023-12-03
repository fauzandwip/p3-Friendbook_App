import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({ placeholder, secure = false, value, onChangeText, name }) => {
	return (
		<View
			style={{
				backgroundColor: '#CDF5FD',
				flexDirection: 'row',
				justifyContent: 'flex-start',
				gap: 10,
				alignItems: 'center',
				width: '100%',
				paddingVertical: 10,
				paddingHorizontal: 20,
				borderRadius: 10,
			}}
		>
			<Icon name={name} size={18} style={{ width: '10%' }} />
			<TextInput
				style={{ flex: 1 }}
				value={value}
				placeholder={placeholder}
				secureTextEntry={secure}
				onChangeText={onChangeText}
			/>
		</View>
	);
};

export default Input;
