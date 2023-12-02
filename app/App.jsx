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
import { useContext, useState } from 'react';
import CreateFormPost from './screens/CreatePostForm';
import Search from './screens/Search';
import DetailPost from './screens/DetailPost';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import { LoginContext, LoginContextProvider } from './context/LoginContext';
import HeaderRight from './components/HeaderRight';

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

const MainNavigation = () => {
	const { isLoggedIn } = useContext(LoginContext);

	return (
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
						headerRight: () => <HeaderRight />,
						headerShadowVisible: false,
					}}
				>
					{isLoggedIn ? (
						<>
							<Stack.Screen name="Main" component={Main} />
							<Stack.Screen
								name="CreatePost"
								component={CreateFormPost}
								options={{
									headerRight: () => <View></View>,
									headerShadowVisible: true,
								}}
							/>
							<Stack.Screen
								name="Search"
								component={Search}
								options={{
									headerRight: () => <View></View>,
									headerShadowVisible: true,
								}}
							/>
							<Stack.Screen
								name="DetailPost"
								component={DetailPost}
								options={{
									headerRight: () => <View></View>,
									headerShadowVisible: true,
								}}
							/>
						</>
					) : (
						<>
							<Stack.Screen
								name="Login"
								component={Login}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="Register"
								component={Register}
								options={{ headerShown: false }}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
};
export default function App() {
	return (
		<ApolloProvider client={client}>
			<LoginContextProvider>
				<MainNavigation />
			</LoginContextProvider>
		</ApolloProvider>
	);
}
