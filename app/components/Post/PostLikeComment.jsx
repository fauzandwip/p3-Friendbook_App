import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

const IconFooterPost = ({ name, text, onPress }) => {
	return (
		<TouchableOpacity
			style={{
				padding: 5,
				flexDirection: 'row',
				alignItems: 'center',
				gap: 8,
			}}
			onPress={onPress}
		>
			<Icon name={name} size={24} color={'gray'} />
			<Text style={{ color: 'gray', fontWeight: 'bold' }}>{text}</Text>
		</TouchableOpacity>
	);
};

const LIKE = gql`
	mutation AddLike($postId: ID!) {
		addLike(postId: $postId)
	}
`;

const GET_POSTS = gql`
	query Posts {
		posts {
			_id
			content
			tags
			imgUrl
			authorId
			comments {
				content
				authorId
				createdAt
			}
			likes {
				authorId
			}
			createdAt
			updatedAt
			user {
				_id
				name
				username
				email
			}
		}
	}
`;

const PostLikeComment = ({ data }) => {
	const { navigate } = useNavigation();
	const [like, { data: likeData, loading, error }] = useMutation(LIKE, {
		refetchQueries: [GET_POSTS, 'Posts'],
	});

	// console.log(data, '>>> post like');
	const handleOnLike = async () => {
		try {
			const response = await like({ variables: { postId: data._id } });
			console.log(response, '>>> response like');
		} catch (error) {
			console.log(error);
		}
	};

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
				{data?.likes.length ? (
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
						<Text style={{ color: 'gray' }}>{data?.likes.length} likes</Text>
					</View>
				) : (
					<View />
				)}

				{/* right */}
				<Text style={{ color: 'gray' }}>{data?.comments.length} comments</Text>
			</View>

			{/* like and comment button */}
			<TouchableOpacity
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignItems: 'center',
					padding: 8,
				}}
			>
				<IconFooterPost
					name={'thumbs-o-up'}
					text={'Like'}
					onPress={handleOnLike}
				/>
				<IconFooterPost
					name={'comment-o'}
					text={'Comment'}
					onPress={() =>
						navigate('DetailPost', {
							id: data._id,
						})
					}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default PostLikeComment;
