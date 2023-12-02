import { Image, Text, View } from 'react-native';

const Comment = () => {
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
						flex: 1,
						backgroundColor: 'lightgray',
						padding: 10,
						borderRadius: 20,
						gap: 5,
					}}
				>
					<Text style={{ fontSize: 18, fontWeight: 'bold' }}>Will Turner</Text>
					<Text>@willturner@willturner@willturner @willturner @willturner</Text>
				</View>
			</View>
		</View>
	);
};

export default Comment;
