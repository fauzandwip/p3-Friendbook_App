import { Image, Text, View } from 'react-native';

const PostContent = () => {
	return (
		<View>
			<Text style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
				Pirates of the Caribbean is a Disney media franchise encompassing
				numerous theme park rides, a series of films, and spin-off novels, as
				well as a number of related video games and other media publications.
			</Text>
			<Image
				style={{
					aspectRatio: 2 / 1,
					objectFit: 'cover',
				}}
				source={{
					// uri: 'https://www.hitxp.com/wp-content/uploads/2019/12/pirates_of_the_caribbean.jpg',
					uri: 'https://source.unsplash.com/random/900×700/?pirates',
				}}
			/>
		</View>
	);
};

export default PostContent;
