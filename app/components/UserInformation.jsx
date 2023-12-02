import { Image, Text, View } from 'react-native';

const UserInformation = ({ childText }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				gap: 10,
			}}
		>
			<Image
				source={{ uri: 'https://i.imgur.com/4gaSugI.jpg' }}
				style={{
					aspectRatio: 1 / 1,
					width: 60,
					borderRadius: 30,
				}}
			/>
			<View style={{ flex: 1, gap: 2 }}>
				<Text style={{ fontSize: 18, fontWeight: 'bold' }}>Will Turner</Text>
				<Text style={{ fontSize: 14, display: childText ? 'flex' : 'none' }}>
					@willturner
				</Text>
			</View>
		</View>
	);
};

export default UserInformation;
