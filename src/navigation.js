// SDKs
import React, { useState, useMemo } from 'react'
import {
	createStackNavigator,
	TransitionPresets
} from '@react-navigation/stack'
import { StyleSheet } from 'react-native'

// Screens
import Login from './screens/Login.screen'

// Utils
import LocalizationContext from './util/context/localization'
import AuthContext from './util/context/auth'
import { LANGUAGES } from './util/constant'

// Create stack for navigation
const Stack = createStackNavigator()

// Stack before authentication
function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				...TransitionPresets.SlideFromRightIOS
			}}>
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	)
}

// Stack after authentication
function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				...TransitionPresets.SlideFromRightIOS
			}}>
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	)
}

// Build Navigator
export default function Navigator() {
	// Create contexts STATE
	const [localization, setLocalization] = useState({
		language: LANGUAGES.ENGLISH
	})
	const [auth, setAuth] = useState({
		token: null
	})

	// Wrap contexts by memo for efficiency
	const localizedValue = useMemo(
		() => ({ localization, setLocalization }),
		[localization, setLocalization]
	)
	const authValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth])

	return (
		<LocalizationContext.Provider value={localizedValue}>
			<AuthContext.Provider value={authValue}>
				{/* If authentication passed then redirect to Home screen. Otherwise redirect to login page */}
				{auth.token ? <HomeStack /> : <AuthStack />}
			</AuthContext.Provider>
		</LocalizationContext.Provider>
	)
}

// Styles
const styles = StyleSheet.create({})
