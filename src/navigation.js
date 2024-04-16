// SDKs
import React, { useState, useMemo, useContext } from 'react'
import {
	createStackNavigator,
	TransitionPresets
} from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { Icon } from '@rneui/themed'

// Screens
import Login from './screens/auth/Login.screen'
import Home from './screens/home/Home.screen'

// Utils
import LocalizationContext from './util/context/localization'
import AuthContext from './util/context/auth'
import { LANGUAGES } from './util/constant'

// Create stack for navigation
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// Create Bottom Tab
// function TabNav() {
// 	return (
// 		<Tab.Navigator>
// 			<Tab.Screen name="Home" component={Home} />
// 			<Tab.Screen name="Applications" component={Login} />
// 		</Tab.Navigator>
// 	)
// }

function TabNav() {
	const hideTabArray = [
		'BaseBallGame',
		'BBGameOneTime',
		'AuthHome',
		'SignUp',
		'SoccerPlay',
		'SelfPlayGame',
		'SoccerSeries',
		'HockeySeries',
		'CommonVideoLibrary',
		'HockeyTournamentTieBreaker',
		'HockeyTournamentMatch',
		'SoccerTieBreaker',
		'HockeyTieBreaker',
		'SoccerTournamentMatch',
		'SoccerTournamentTieBreaker',
		'HockeyPlay',
		'SoccerTournamentRunningMatch',
		'HockeyTournamentRunningMatch',
		'RunningBaseBallTournamentMatch',
		'BaseCreate',
		'RunningSoccerMatch',
		'RunningHockeyMatch',
		'RunningBaseBallSingleGame',
		'SoccerTournamentRunningMatch',
		'HockeyTournamentRunningMatch',
		'Camera',
		'CameraIOS',
		'Pic',
		'CameraIosPic',
		'CheckIn'
	]

	return (
		<Tab.Navigator
			backBehaviour="initialRoute"
			screenOptions={({ route }) => ({
				headerShown: false,

				tabBarStyle: !hideTabArray.includes(getFocusedRouteNameFromRoute(route))
					? {
							backgroundColor: '#191E26',
							paddingVertical: hp('1%'),
							borderTopColor: 'transparent'
					  }
					: {
							display: 'none'
					  },

				tabBarActiveTintColor: 'white',
				tabBarInactiveTintColor: '#545B67',
				tabBarIcon: ({ color }) => {
					let iconName
					console.log('HHHHHH: ', route)
					switch (route.name) {
						case 'HomeStack':
							iconName = 'home-sharp'
							break
						case 'Applications':
							iconName = 'home'
							break
						case 'Directory':
							iconName = 'home'
							break
						default:
							iconName = 'home'
					}

					return (
						<Icon name={iconName} type={'ionicon'} size={26} color={color} />
					)
				}
			})}>
			<Tab.Screen name="HomeStack" component={HomeStack} />
			<Tab.Screen name="Applications" component={AuthStack} />
			<Tab.Screen
				options={({ route }) => ({
					tabBarVisible: route.state
						? route.state.routes[route.state.index].name === 'BaseCreate' ||
						  route.state.routes[route.state.index].name ===
								'CommonVideoLibrary'
							? false
							: true
						: true
				})}
				name="Directory"
				component={AuthStack}
			/>
		</Tab.Navigator>
	)
}

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
			<Stack.Screen name="Home" component={Home} />
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
		token: 'TEMP_TOKEN'
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
				{auth.token ? <TabNav /> : <AuthStack />}
			</AuthContext.Provider>
		</LocalizationContext.Provider>
	)
}

// Styles
const styles = StyleSheet.create({})
