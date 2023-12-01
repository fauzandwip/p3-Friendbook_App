import {
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableOpacityComponent,
	View,
} from 'react-native';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';

const Home = ({ navigation }) => {
	return (
		<ScrollView
			style={{
				// height: '100%',
				backgroundColor: 'lightgray',
			}}
		>
			<View style={{ gap: 10 }}>
				<CreatePost />
				<View
					style={{
						gap: 10,
					}}
				>
					<Post></Post>
					<Post></Post>
					<Post></Post>
				</View>
			</View>
		</ScrollView>
	);
};

export default Home;
