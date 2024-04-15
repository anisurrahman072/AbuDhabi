// SDKs
import { AppRegistry } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from 'react-native-flash-message'
import { StyleSheet } from 'react-native'

// Components
import { name as appName } from './app.json'
import Navigator from './src/navigation'

// Utils
import FONTS from './src/util/fonts/fontStyles'

// Wrap "Navigator" by NavigationContainer
function App() {
	// Connect with Database here

	// Return app navigation container
	return (
		<NavigationContainer>
			<Navigator />
			<FlashMessage position="top" titleStyle={styles.alertTitleStyle} />
		</NavigationContainer>
	)
}

// Register app
AppRegistry.registerComponent(appName, () => App)

// Styles
const styles = StyleSheet.create({
	alertTitleStyle: {
		...FONTS.regular16,
		textAlign: 'center'
	}
})
