import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import styles from '../styles';
import UserInformation from '../components/UserInformation';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const GET_USER_BY_ID = gql`
	query User {
		user {
			_id
			email
			name
			username
			following {
				_id
				user {
					name
					username
				}
			}
			followers {
				_id
				user {
					name
					username
				}
			}
		}
	}
`;

const Profile = () => {
	const { data, loading, error } = useQuery(GET_USER_BY_ID);
	const [isFollowers, setIsFollowers] = useState(true);

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
					paddingVertical: 30,
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
				<Text style={{ fontSize: 30, fontWeight: 'bold' }}>
					{data?.user?.name}
				</Text>
				<Text style={{ fontWeight: '500' }}>@{data?.user?.username}</Text>
			</View>

			{/* following and followers */}
			<View style={{ flex: 3, width: '100%' }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}
				>
					<TouchableOpacity
						style={{
							borderColor: isFollowers ? '#1877f2' : 'lightgray',
							backgroundColor: isFollowers ? '#1877f2' : 'white',
							paddingVertical: 10,
							flex: 1,
							borderWidth: 1,
							borderRightWidth: 0,
							borderTopStartRadius: 10,
							borderBottomStartRadius: 10,
						}}
						onPress={() => setIsFollowers(true)}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: 'bold',
								textAlign: 'center',
								color: isFollowers ? 'white' : 'gray',
							}}
						>
							Followers
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							borderColor: !isFollowers ? '#1877f2' : 'lightgray',
							backgroundColor: !isFollowers ? '#1877f2' : 'white',
							paddingVertical: 10,
							flex: 1,
							borderWidth: 1,
							borderTopEndRadius: 10,
							borderBottomRightRadius: 10,
						}}
						onPress={() => setIsFollowers(false)}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: 'bold',
								textAlign: 'center',
								color: !isFollowers ? 'white' : 'gray',
							}}
						>
							Following
						</Text>
					</TouchableOpacity>
				</View>

				{/* list of user */}
				{data?.user && (
					<View style={{ flex: 1, marginTop: 30 }}>
						<FlatList
							data={isFollowers ? data?.user.followers : data?.user.following}
							renderItem={({ item }) => (
								<UserInformation data={item.user} childText={true} />
							)}
							keyExtractor={(item) => item._id}
							ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
						/>
					</View>
				)}
			</View>
		</View>
	);
};

export default Profile;
