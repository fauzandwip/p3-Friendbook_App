import { Image, Text, View } from 'react-native';

const PostHeader = ({ data }) => {
	console.log(data, '>>> post header');
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				padding: 10,
				gap: 10,
			}}
		>
			<Image
				source={{ uri: 'https://i.imgur.com/4gaSugI.jpg' }}
				style={{
					aspectRatio: 1 / 1,
					width: 50,
					borderRadius: 25,
				}}
			/>
			<View style={{ flex: 1, gap: 2 }}>
				<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
					{data?.user?.username ?? data?.user?.name}
				</Text>
				<Text style={{ fontSize: 12, color: 'gray', marginLeft: 2 }}>27m</Text>
			</View>
		</View>
	);
};

export default PostHeader;
