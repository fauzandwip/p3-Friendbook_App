import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PostLikeComment = () => {
	return (
		<View style={{ marginHorizontal: 10 }}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottomWidth: 0.3,
					borderColor: 'gray',
					padding: 10,
				}}
			>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 7,
					}}
				>
					<View
						style={{
							backgroundColor: '#1877f2',
							padding: 5,
							borderRadius: 15,
						}}
					>
						<Icon name="thumbs-up" size={12} color={'white'} />
					</View>
					<Text style={{ color: 'gray' }}>11 likes</Text>
				</View>
				<Text style={{ color: 'gray' }}>27 comments</Text>
			</View>

			{/* like and comment button */}
			<View
				style={{
					// width: '100%',
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignItems: 'center',
					padding: 8,
				}}
			>
				<View
					style={{
						padding: 5,
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 8,
					}}
				>
					<Icon name="thumbs-o-up" size={24} color={'black'} />
					<Text style={{ color: 'black', fontWeight: 'bold' }}>Like</Text>
				</View>
				<View
					style={{
						padding: 5,
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 8,
					}}
				>
					<Icon name="comment-o" size={24} color={'black'} />
					<Text style={{ color: 'black', fontWeight: 'bold' }}>Comment</Text>
				</View>
			</View>
		</View>
	);
};

export default PostLikeComment;
