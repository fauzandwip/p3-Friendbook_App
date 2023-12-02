import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TextInput,
	View,
} from 'react-native';
import Post from '../components/Post';
import Icon from 'react-native-vector-icons/FontAwesome';
import Comment from '../components/Comment';
import { gql, useQuery } from '@apollo/client';

const GET_POST_BY_ID = gql`
	query Post($postId: ID!) {
		post(id: $postId) {
			_id
			content
			tags
			imgUrl
			authorId
			comments {
				content
				authorId
				createdAt
				updatedAt
				user {
					name
					username
				}
			}
			likes {
				authorId
				createdAt
				updatedAt
				user {
					name
					username
				}
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

const DetailPost = ({ route }) => {
	const { data, loading, error } = useQuery(GET_POST_BY_ID, {
		variables: {
			postId: route.params.id,
		},
	});

	console.log(data, '>>> post detail');
	console.log(route.params.id, '>>> id');
	console.log(JSON.stringify(error, null, 2));

	return (
		<View
			style={{
				backgroundColor: 'white',
				flex: 1,
			}}
		>
			<ScrollView style={{ flex: 1 }}>
				<Post data={data?.post} />
				{/* COMMENTS */}
				{data?.post &&
					data?.post.comments.map((data, index) => {
						return <Comment key={index} data={data} />;
					})}
			</ScrollView>

			{/* ADD COMMENT */}
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
