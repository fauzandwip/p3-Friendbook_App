import { FlatList, View } from 'react-native';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';
import Loading from '../components/Loading';
import Error from '../components/Error';

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

const Home = () => {
	const isFocused = useIsFocused();
	const { data, loading, error, refetch } = useQuery(GET_POSTS);

	// console.log(data, '>>> posts');
	// console.log(JSON.stringify(error, null, 2));

	useEffect(() => {
		refetch();
		console.log('refetch posts');
	}, [isFocused]);

	return (
		<View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 10 }}>
			<CreatePost />
			{loading ? (
				<Loading />
			) : (
				data && (
					<FlatList
						data={data.posts}
						renderItem={({ item }) => <Post data={item} isTouchable={true} />}
						keyExtractor={(item) => item._id}
						ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
						style={{ backgroundColor: 'lightgray', paddingTop: 10 }}
					/>
				)
			)}
			{error && <Error error={error} />}
		</View>
	);
};

export default Home;
