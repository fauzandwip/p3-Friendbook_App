import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import Post from '../components/Post';
import Icon from 'react-native-vector-icons/FontAwesome';
import Comment from '../components/Comment';

const DetailPost = () => {
	return (
		<View
			style={{
				backgroundColor: 'white',
				flex: 1,
			}}
		>
			<ScrollView style={{ flex: 1 }}>
				<Post></Post>
				{/* COMMENTS */}
				<View style={{ backgroundColor: 'white' }}>
					<Comment />
					<Comment />
					<Comment />
				</View>
			</ScrollView>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderTopWidth: 1,
					borderTopColor: 'lightgray',
					paddingVertical: 10,
					paddingHorizontal: 20,
					gap: 10,
				}}
			>
				<TextInput
					placeholder="Write a comment..."
					style={{
						backgroundColor: 'whitesmoke',
						paddingVertical: 10,
						paddingHorizontal: 30,
						borderRadius: 20,
						flex: 1,
					}}
				/>
				<Icon name="send" size={20} color={'gray'} />
			</View>
		</View>
	);
};

export default DetailPost;
