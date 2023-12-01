import { SafeAreaView, ScrollView, View } from 'react-native';
import Post from '../components/Post';

const Home = () => {
	return (
		<ScrollView
			style={
				{
					// height: '100%',
					// backgroundColor: 'red',
				}
			}
		>
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
