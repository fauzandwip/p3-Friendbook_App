import {
	FlatList,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableOpacityComponent,
	View,
} from 'react-native';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

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

const Home = ({ navigation }) => {
	const { data, loading, error } = useQuery(GET_POSTS);

	// console.log(data, '>>> posts');
	// console.log(JSON.stringify(error, null, 2));

	return (
		<View style={{ gap: 10, flex: 1 }}>
			<CreatePost />
			{data && (
				<FlatList
					data={data.posts}
					renderItem={({ item }) => <Post data={item} isTouchable={true} />}
					keyExtractor={(item) => item._id}
					ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				/>
			)}
		</View>
	);
};

export default Home;
