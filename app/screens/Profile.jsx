import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import UserInformation from '../components/UserInformation';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Error from '../components/Error';
import Loading from '../components/Loading';

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
	const isFocused = useIsFocused();
	const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID);
	const [isFollowers, setIsFollowers] = useState(true);

	useEffect(() => {
		refetch();
		console.log('refetch profile screen');
	}, [isFocused]);

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;

	return (
		<View
			style={{ ...styles.container, justifyContent: 'center', padding: 20 }}
		>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					paddingVertical: 40,
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
				{data?.user.username && (
					<Text style={{ fontWeight: '500' }}>@{data?.user?.username}</Text>
				)}
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
