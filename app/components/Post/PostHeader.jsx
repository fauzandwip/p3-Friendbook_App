import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostHeader = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigation.navigate('DetailPost')}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					padding: 10,
					gap: 10,
				}}
			>
				<Image
					source={{ uri: 'https://i.imgur.com/4gaSugI.jpg' }}
					style={{
						aspectRatio: 1 / 1,
						width: 44,
						borderRadius: 22,
					}}
				/>
				<View style={{ flex: 1, gap: 2 }}>
					<Text style={{ fontSize: 18, fontWeight: 'bold' }}>Jack Sparrow</Text>
					<Text style={{ fontSize: 12, color: 'gray', marginLeft: 2 }}>
						27m
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default PostHeader;
