import { SafeAreaView, ScrollView, View } from 'react-native';
import Post from '../components/Post';

const Home = () => {
	return (
		<SafeAreaView>
			<ScrollView
				style={{
					height: '100%',
					// backgroundColor: 'red',
				}}
			>
				<View
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 10,
						backgroundColor: 'lightgray',
					}}
				>
					<Post></Post>
					<Post></Post>
					<Post></Post>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
