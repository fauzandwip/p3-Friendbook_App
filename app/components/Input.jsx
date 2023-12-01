import { TextInput } from 'react-native';

const Input = ({ placeholder, secure = false }) => {
	return (
		<TextInput
			style={{
				backgroundColor: '#CDF5FD',
				width: '100%',
				paddingVertical: 10,
				paddingHorizontal: 20,
				borderRadius: 10,
			}}
			placeholder={placeholder}
			secureTextEntry={secure}
		></TextInput>
	);
};

export default Input;
