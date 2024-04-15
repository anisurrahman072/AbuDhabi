// SDKs
import React, { useState, useContext } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Platform,
	TouchableOpacity,
	Image,
	TextInput
} from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'

// Utils
import { themeColor } from '../util/colors/colors'
import LocalizationContext from '../util/context/localization.js'
import findLocalText from '../util/localization/findLocalText.js'
import findImages from '../util/images/findIcon.js'
import FONTS from '../util/fonts/fontStyles.js'

// Constants
import { LANGUAGES } from '../util/constant'

export default function Login({ navigation: { navigate, goBack }, route }) {
	//context
	const { localization, setLocalization } = useContext(LocalizationContext)

	// State
	const [email, setEmail] = useState(null)

	// Update localization
	function updateLocalization() {
		setLocalization({
			language:
				localization.language == LANGUAGES.ENGLISH
					? LANGUAGES.ARABIC
					: LANGUAGES.ENGLISH
		})
	}

	return (
		<View style={styles.container}>
			{/* Update Localization */}
			<View style={styles.changeLocalizationBox}>
				<TouchableOpacity
					style={{
						alignItems:
							localization.language == LANGUAGES.ENGLISH
								? 'flex-end'
								: 'flex-start'
					}}
					onPress={() => updateLocalization()}>
					<Text style={styles.changeLocalizationText}>
						{findLocalText({
							screenName: 'loginScreen',
							local: localization.language,
							attribute: 'localization'
						})}
					</Text>
				</TouchableOpacity>
			</View>

			{/* Company Logo */}
			<View style={styles.companyName}>
				<Image resizeMode="contain" source={findImages['companyName']} />
			</View>

			{/* Title */}
			<View style={styles.titleBox}>
				<Text style={styles.title}>
					{findLocalText({
						screenName: 'loginScreen',
						local: localization.language,
						attribute: 'title'
					})}
				</Text>
			</View>

			{/* Input field */}
			<View>
				<TextInput
					style={styles.textInput}
					value={email}
					placeholder={findLocalText({
						screenName: 'loginScreen',
						local: localization.language,
						attribute: 'placeholder'
					})}
					placeholderTextColor={'gray'}
					autoCapitalize={'none'}
					onChangeText={(text) => setEmail(text)}
					selectionColor={'white'}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: themeColor,
		paddingTop: Platform.OS === 'ios' ? hp('6') : hp('4'),
		paddingHorizontal: wp(5)
	},
	changeLocalizationBox: {
		paddingVertical: hp(5),
		paddingHorizontal: wp(2)
	},
	changeLocalizationText: {
		...FONTS.regular16
	},
	companyName: {
		alignItems: 'center'
	},
	titleBox: {
		marginTop: hp(35),
		marginBottom: hp(4)
	},
	title: {
		...FONTS.bold46,
		textAlign: 'center'
	},
	textInput: {
		...FONTS.bold15,
		color: '#333333',
		backgroundColor: '#FFFFFF',
		height: hp('7%'),
		borderWidth: 0.5,
		borderRadius: wp(5),
		borderColor: 'white',
		paddingVertical: wp(3),
		paddingHorizontal: wp(5)
	}
})
