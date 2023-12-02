import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserInformation from '../components/UserInformation';

const Search = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white',
			}}
		>
			<View
				style={{
					// flex: 1,
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
						paddingVertical: 10,
						borderRadius: 20,
						paddingHorizontal: 30,
					}}
				>
					<TextInput
						style={{
							fontSize: 18,
							color: 'white',
						}}
						placeholderTextColor={'white'}
						placeholder="search"
					/>
					<Icon name="search" size={20} color={'white'} />
				</View>
			</View>

			<ScrollView style={{ width: '100%', paddingTop: 10 }}>
				<View
					style={{
						flex: 1,
						// backgroundColor: 'green',
						paddingHorizontal: 20,
						gap: 20,
						paddingBottom: 40,
					}}
				>
					<UserInformation childText={true} button={true} />
					<UserInformation childText={true} button={true} />
				</View>
			</ScrollView>
		</View>
	);
};

export default Search;
