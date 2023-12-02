import { TextInput } from 'react-native';

const Input = ({ placeholder, secure = false, value, onChangeText }) => {
	return (
		<TextInput
			style={{
				backgroundColor: '#CDF5FD',
				width: '100%',
				paddingVertical: 10,
				paddingHorizontal: 20,
				borderRadius: 10,
			}}
			value={value}
			placeholder={placeholder}
			secureTextEntry={secure}
			onChangeText={onChangeText}
		/>
	);
};

export default Input;
