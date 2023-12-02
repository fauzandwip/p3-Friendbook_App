import { Image, ScrollView, Text, View } from 'react-native';
import styles from '../styles';
import UserInformation from '../components/UserInformation';

const Profile = () => {
	return (
		<View
			style={{ ...styles.container, justifyContent: 'center', padding: 20 }}
		>
			<View
				style={{
					flex: 1,
					gap: 5,
					alignItems: 'center',
					justifyContent: 'center',
					paddingVertical: 50,
					// backgroundColor: 'cyan',
				}}
			>
				<Image
					source={{ uri: 'https://i.imgur.com/4gaSugI.jpg' }}
					style={{
						aspectRatio: 1 / 1,
						width: 100,
						borderRadius: 50,
						marginBottom: 10,
					}}
				/>
				<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Jack Sparrow</Text>
				<Text style={{ fontWeight: '500' }}>@jack</Text>
			</View>

			{/* following and followers */}
			<View style={{ flex: 3, width: '100%' }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}
				>
					<View
						style={{
							paddingVertical: 10,
							flex: 1,
							borderWidth: 1,
							borderRightWidth: 0,
							borderColor: 'lightgray',
							borderTopStartRadius: 10,
							borderBottomStartRadius: 10,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: 'bold',
								textAlign: 'center',
								color: 'gray',
							}}
						>
							Followers
						</Text>
					</View>
					<View
						style={{
							paddingVertical: 10,
							backgroundColor: '#1877f2',
							flex: 1,
							borderWidth: 1,
							borderColor: '#1877f2',
							borderTopEndRadius: 10,
							borderBottomRightRadius: 10,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: 'bold',
								textAlign: 'center',
								color: 'white',
							}}
						>
							Followings
						</Text>
					</View>
				</View>

				{/* list of user */}
				<ScrollView style={{ width: '100%', marginTop: 20 }}>
					<View
						style={{
							paddingVertical: 20,
							gap: 20,
						}}
					>
						<UserInformation childText={true} />
						<UserInformation childText={true} />
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default Profile;
