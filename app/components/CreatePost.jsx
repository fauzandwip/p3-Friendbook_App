import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreatePost = () => {
	const { navigate } = useNavigation();
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				gap: 20,
				backgroundColor: 'white',
				paddingVertical: 12,
				paddingHorizontal: 12,
			}}
		>
			<TouchableOpacity onPress={() => navigate('Profile')}>
				<Image
					source={{ uri: 'https://i.imgur.com/4gaSugI.jpg' }}
					style={{ aspectRatio: 1 / 1, width: 44, borderRadius: 22 }}
				></Image>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					paddingVertical: 8,
					borderWidth: 1,
					borderColor: 'gray',
					borderRadius: 20,
					flex: 1,
				}}
				onPress={() => navigate('CreatePost')}
			>
				<Text
					style={{ textAlign: 'left', fontSize: 16, paddingHorizontal: 20 }}
				>
					What's on your mind?
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CreatePost;
