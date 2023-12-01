import Register from './screens/Register';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
	Platform,
	SafeAreaView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { useState } from 'react';
import SearchButton from './components/SearchButton';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Main = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="home" color={color} size={24}></Icon>
					),
					tabBarShowIcon: true,
					tabBarShowLabel: false,
					tabBarActiveTintColor: '#1877f2',
					tabBarInactiveTintColor: 'gray',
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="user-circle" color={color} size={24}></Icon>
					),
					tabBarShowIcon: true,
					tabBarShowLabel: false,
					tabBarActiveTintColor: '#1877f2',
					tabBarInactiveTintColor: 'gray',
				}}
			/>
		</Tab.Navigator>
	);
};

export default function App() {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<>
			<SafeAreaView
				style={{
					flex: 1,
					paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
				}}
			>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerTitle: 'friendbook',
							headerTintColor: '#1877f2',
							headerTitleStyle: {
								fontWeight: 'bold',
								fontSize: 30,
							},
							headerTitleAlign: 'left',
							headerRight: () => <SearchButton />,
							headerShadowVisible: false,
						}}
					>
						{isLogin ? (
							<>
								<Stack.Screen name="Home" component={Main} />
								<Stack.Screen
									name="DetailPost"
									component={Profile}
									options={{
										headerRight: () => <View></View>,
										headerShadowVisible: true,
									}}
								/>
							</>
						) : (
							<>
								<Stack.Screen
									name="Register"
									component={Register}
									options={{ headerShown: false }}
								/>
								<Stack.Screen
									name="Login"
									component={Login}
									options={{ headerShown: false }}
									initialParams={{ isLogin, setIsLogin }}
								/>
							</>
						)}
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		</>
	);
}
