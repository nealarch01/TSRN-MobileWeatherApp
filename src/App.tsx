import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	SafeAreaView,
	FlatList,
	LogBox,
} from 'react-native';

import HomeScreen from './Home/HomeScreen';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator();

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!"
]); // api is up to date, the warning is an issue with detection
// stack is up to date as of Feb 16

const App = () => {
	StatusBar.setBarStyle('light-content', true);
	return (
		<NavigationContainer independent={true}>
			<RootStack.Navigator
				initialRouteName='HomeScreen'
				screenOptions={{
					headerShown: false
				}}
			>
				<RootStack.Screen name='HomeScreen' component={HomeScreen} />
			</RootStack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
		backgroundColor: '#191414',
	},
	HeaderText: {
		fontSize: 36,
		fontWeight: '600',
		color: '#FFFFFF',
	}
});

export default App;