import { View } from 'react-native';
import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostLikeComment from './Post/PostLikeComment';

const Post = () => {
	return (
		<View
			style={{
				backgroundColor: 'white',
				borderColor: 'black',
			}}
		>
			<PostHeader />
			<PostContent />
			<PostLikeComment />
		</View>
	);
};

export default Post;
