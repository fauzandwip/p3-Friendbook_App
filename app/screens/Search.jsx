import { FlatList, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserInformation from '../components/UserInformation';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { LoginContext } from '../context/LoginContext';

const GET_USER_BY_NAME_USERNAME = gql`
	query SearchUserByName($name: String!) {
		usersByName(name: $name) {
			_id
			name
			username
			email
		}
	}
`;

const GET_USER_BY_ID = gql`
	query User {
		user {
			_id
			email
			name
			username
			following {
				_id
				followingId
				followerId
				user {
					name
					username
				}
			}
			followers {
				_id
				followingId
				followerId
				user {
					name
					username
				}
			}
		}
	}
`;

const Search = () => {
	const { currentUser } = useContext(LoginContext);

	const [search, setSearch] = useState('');
	const { data } = useQuery(GET_USER_BY_NAME_USERNAME, {
		variables: {
			name: search,
		},
	});

	const {
		data: profile,
		loading: loadingProfile,
		error: errorProfile,
	} = useQuery(GET_USER_BY_ID);

	// console.log(data, '>>> search');
	// console.log(JSON.stringify(errorProfile, null, 2), '>>> error search');

	const isFollowing = (id, arr) => {
		const result = arr?.findIndex((data) => data.followingId === id);
		return result === -1 ? false : true;
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white',
			}}
		>
			<View
				style={{
					paddingTop: 40,
					paddingBottom: 10,
					paddingHorizontal: 20,
					justifyContent: 'flex-end',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						backgroundColor: '#1877f2',
						borderRadius: 20,
						paddingRight: 30,
					}}
				>
					<TextInput
						style={{
							fontSize: 18,
							color: 'white',
							flex: 1,
							paddingVertical: 10,
							paddingHorizontal: 30,
							borderRadius: 20,
						}}
						placeholderTextColor={'white'}
						placeholder="search"
						autoCapitalize="none"
						onChangeText={(text) => setSearch(text)}
					/>
					<Icon name="search" size={20} color={'white'} />
				</View>
			</View>

			{data?.usersByName && (
				<View
					style={{
						flex: 1,
						paddingHorizontal: 20,
						paddingTop: 20,
						gap: 20,
						paddingBottom: 40,
					}}
				>
					<FlatList
						data={data?.usersByName.filter(
							(obj) => obj._id !== currentUser?._id
						)}
						renderItem={({ item }) => (
							<UserInformation
								data={item}
								query={GET_USER_BY_NAME_USERNAME}
								childText={true}
								button={!isFollowing(item._id, profile?.user.following)}
							/>
						)}
						keyExtractor={(item) => item._id}
						ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
					/>
				</View>
			)}
		</View>
	);
};

export default Search;
