import { ActivityIndicator, Text, View } from 'react-native';

const Error = ({ error }) => {
	console.log(error);
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<View
				style={{ width: '70%', justifyContent: 'center', alignItems: 'center' }}
			>
				<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{error?.name}</Text>
				<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
					{error?.message}
				</Text>
			</View>
		</View>
	);
};

export default Error;
