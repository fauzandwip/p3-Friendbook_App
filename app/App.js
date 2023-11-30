import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './screens/Register';

export default function App() {
	return (
		<Register />
		// <View style={styles.container}>
		// 	<Text>Test 123 up App.js to start working on your app!</Text>
		// 	<StatusBar style="auto" />
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
