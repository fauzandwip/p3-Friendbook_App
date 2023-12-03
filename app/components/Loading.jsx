import { ActivityIndicator } from 'react-native';

const Loading = () => {
	return (
		<ActivityIndicator
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white',
			}}
			size={'large'}
			color={'#1877f2'}
		/>
	);
};

export default Loading;
