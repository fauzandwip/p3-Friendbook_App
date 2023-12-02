import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Post from '../components/Post';
import Icon from 'react-native-vector-icons/FontAwesome';
import Comment from '../components/Comment';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

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

const ADD_COMMENT = gql`
	mutation AddComment($comment: String!, $postId: ID!) {
		addComment(comment: $comment, postId: $postId)
	}
`;

const DetailPost = ({ route, refetchPosts }) => {
	const [comment, setComment] = useState('');
	const { data, loading, error } = useQuery(GET_POST_BY_ID, {
		variables: {
			postId: route.params.id,
		},
	});
	const [addComment, { data: commentData }] = useMutation(ADD_COMMENT, {
		refetchQueries: [GET_POST_BY_ID, 'Post'],
		onCompleted: (data) => refetchPosts,
	});

	// console.log(data, '>>> post detail');
	// console.log(route.params.id, '>>> id');
	// console.log(JSON.stringify(error, null, 2));

	const handleOnAddComment = async () => {
		try {
			// console.log(comment);
			const response = await addComment({
				variables: {
					comment,
					postId: route.params.id,
				},
			});
			setComment('');
			console.log(response, '>>> resoonse add comment');
		} catch (error) {
			console.log(error);
		}
	};

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
					value={comment}
					onChangeText={(text) => setComment(text)}
				/>
				<TouchableOpacity onPress={handleOnAddComment}>
					<Icon name="send" size={20} color={comment ? '#1877f2' : 'gray'} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default DetailPost;
