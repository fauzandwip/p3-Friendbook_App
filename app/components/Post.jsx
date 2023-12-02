import { TouchableOpacity, View } from 'react-native';
import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostLikeComment from './Post/PostLikeComment';
import { useNavigation } from '@react-navigation/native';

const Post = ({ isTouchable }) => {
	const navigation = useNavigation();

	return (
		<View
			style={{
				backgroundColor: 'white',
				borderColor: 'black',
			}}
		>
			{isTouchable ? (
				<TouchableOpacity onPress={() => navigation.navigate('DetailPost')}>
					<PostHeader />
					<PostContent />
				</TouchableOpacity>
			) : (
				<>
					<PostHeader />
					<PostContent />
				</>
			)}
			<PostLikeComment />
		</View>
	);
};

export default Post;
