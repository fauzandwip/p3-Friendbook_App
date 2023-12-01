import {
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableOpacityComponent,
	View,
} from 'react-native';
import Post from '../components/Post';

const Home = ({ navigation }) => {
	return (
		<ScrollView
			style={
				{
					// height: '100%',
					// backgroundColor: 'red',
				}
			}
		>
			<View>
				<TouchableOpacity
					style={{ padding: 20 }}
					onPress={() => navigation.navigate('DetailPost')}
				>
					<Text>CREATE POST</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					gap: 10,
					backgroundColor: 'lightgray',
				}}
			>
				<Post></Post>
				<Post></Post>
				<Post></Post>
			</View>
		</ScrollView>
	);
};

export default Home;
