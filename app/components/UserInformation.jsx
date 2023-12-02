import { Image, Text, TouchableOpacity, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';

const FOLLOW = gql`
	mutation Follow($userId: ID) {
		follow(userId: $userId) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;

const GET_USER_BY_NAME_USERNAME = gql`
	query SearchUserByName($name: String!) {
		usersByName(name: $name) {
			_id
			name
			username
			email
		}
	}
`;

const UserInformation = ({ childText, button, data, search, query }) => {
	// console.log(data, '>>> user information');
	const [
		follow,
		{ data: followData, loading: followLoading, error: followError },
	] = useMutation(FOLLOW, {
		refetchQueries: [GET_USER_BY_NAME_USERNAME, 'SearchUserByName'],
	});

	const handleOnFollow = async () => {
		try {
			const id = data?._id;
			const response = await follow({ variables: { userId: id } });
			console.log(response, '>>> response follow');
		} catch (error) {
			console.log(error);
		}
	};
	// console.log(followData, '>>> data follow');

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				// backgroundColor: 'cyan',
				width: '100%',
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 10,
					// backgroundColor: 'red',
					flex: 1,
				}}
			>
				<Image
					source={{ uri: 'https://i.imgur.com/4gaSugI.jpg' }}
					style={{
						aspectRatio: 1 / 1,
						width: 60,
						borderRadius: 30,
					}}
				/>
				<View style={{ flex: 1, gap: 3 }}>
					<Text style={{ fontSize: 18, fontWeight: 'bold' }}>{data?.name}</Text>
					<Text style={{ fontSize: 14, display: childText ? 'flex' : 'none' }}>
						@{data?.username}
					</Text>
				</View>
			</View>

			{button && (
				<TouchableOpacity
					style={{
						backgroundColor: 'lightgray',
						paddingVertical: 10,
						paddingHorizontal: 20,
						margin: 10,
						borderRadius: 20,
					}}
					onPress={handleOnFollow}
				>
					<Text style={{ color: 'black', fontWeight: 'bold' }}>Follow</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default UserInformation;
