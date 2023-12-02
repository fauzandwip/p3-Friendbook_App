import { TouchableOpacity, View } from 'react-native';
import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostLikeComment from './Post/PostLikeComment';
import { useNavigation } from '@react-navigation/native';

const Post = ({ isTouchable, data }) => {
	const navigation = useNavigation();

	// console.log(data, '>>> post');
	return (
		<View
			style={{
				backgroundColor: 'white',
				borderColor: 'black',
			}}
		>
			{isTouchable ? (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('DetailPost', {
							id: data._id,
						})
					}
				>
					<PostHeader data={data} />
					<PostContent data={data} />
				</TouchableOpacity>
			) : (
				<>
					<PostHeader data={data} />
					<PostContent data={data} />
				</>
			)}
			<PostLikeComment data={data} />
		</View>
	);
};

export default Post;
