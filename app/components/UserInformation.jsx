import { Image, Text, TouchableOpacity, View } from 'react-native';

const UserInformation = ({ childText, button }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				// backgroundColor: 'cyan',
				width: '100%',
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 10,
					// backgroundColor: 'red',
					flex: 1,
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
				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 18, fontWeight: 'bold' }}>Will Turner</Text>
					<Text style={{ fontSize: 14, display: childText ? 'flex' : 'none' }}>
						@willturner
					</Text>
				</View>
			</View>

			{button && (
				<TouchableOpacity
					style={{
						backgroundColor: 'lightgray',
						paddingVertical: 10,
						paddingHorizontal: 20,
						margin: 10,
						borderRadius: 20,
					}}
				>
					<Text style={{ color: 'black', fontWeight: 'bold' }}>Follow</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default UserInformation;
