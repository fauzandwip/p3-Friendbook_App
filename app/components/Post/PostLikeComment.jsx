import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconFooterPost = ({ name, text }) => {
	return (
		<View
			style={{
				padding: 5,
				flexDirection: 'row',
				alignItems: 'center',
				gap: 8,
			}}
		>
			<Icon name={name} size={24} color={'gray'} />
			<Text style={{ color: 'gray', fontWeight: 'bold' }}>{text}</Text>
		</View>
	);
};

const PostLikeComment = () => {
	return (
		<View style={{ marginHorizontal: 10 }}>
			{/* likes and comments information */}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottomWidth: 0.3,
					borderColor: 'gray',
					padding: 10,
				}}
			>
				{/* left */}
				<View
					style={{
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

				{/* right */}
				<Text style={{ color: 'gray' }}>27 comments</Text>
			</View>

			{/* like and comment button */}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignItems: 'center',
					padding: 8,
				}}
			>
				<IconFooterPost name={'thumbs-o-up'} text={'Like'} />
				<IconFooterPost name={'comment-o'} text={'Comment'} />
			</View>
		</View>
	);
};

export default PostLikeComment;
