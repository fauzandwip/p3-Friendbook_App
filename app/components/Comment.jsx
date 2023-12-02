import { Image, Text, View } from 'react-native';

const Comment = ({ data }) => {
	// console.log(data, '>>> comment');
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				// backgroundColor: 'cyan',
				width: '100%',
				padding: 10,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'flex-start',
					gap: 10,
					// backgroundColor: 'red',
					flex: 1,
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
				<View
					style={{
						// flex: 1,
						backgroundColor: 'lightgray',
						paddingVertical: 10,
						paddingHorizontal: 15,
						borderRadius: 20,
						gap: 5,
					}}
				>
					<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
						{data?.user?.username}
					</Text>
					<Text>{data?.content}</Text>
				</View>
			</View>
		</View>
	);
};

export default Comment;
