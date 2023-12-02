import { Image, Text, View } from 'react-native';

const PostContent = ({ data }) => {
	return (
		<View>
			<Text style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
				{data?.content}
			</Text>
			<Image
				style={{
					aspectRatio: 2 / 1,
					objectFit: 'cover',
				}}
				source={{
					// uri: 'https://www.hitxp.com/wp-content/uploads/2019/12/pirates_of_the_caribbean.jpg',
					uri: 'https://source.unsplash.com/random/900×700/?post',
				}}
			/>
		</View>
	);
};

export default PostContent;
