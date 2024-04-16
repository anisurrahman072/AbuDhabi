// SDKs
import React, { useState, useContext } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Platform,
	TouchableOpacity,
	Image,
	TextInput,
	KeyboardAvoidingView,
	ScrollView
} from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { Icon } from '@rneui/themed'

// Utils
import { themeColor } from '../../util/colors/colors.js'
import LocalizationContext from '../../util/context/localization.js'
import findLocalText from '../../util/localization/findLocalText.js'
import findImages from '../../util/images/findIcon.js'
import FONTS from '../../util/fonts/fontStyles.js'

// Constants
import { LANGUAGES } from '../../util/constant.js'

export default function Home({ navigation: { navigate, goBack }, route }) {
	//context
	const { localization, setLocalization } = useContext(LocalizationContext)

	// State
	const [code, setCode] = useState(null)

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
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : ''}
			style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
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
					<Image resizeMode="contain" source={findImages.companyName} />
				</View>

				{/* Title */}
				<View style={styles.titleBox}>
					<Text style={styles.title}>HOME</Text>
				</View>

				{/* TEST ICON */}
				<Icon type="ionicon" name="home-outline" size={26} reverse={true} />
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: themeColor,
		paddingTop: Platform.OS === 'ios' ? hp(6) : hp(2),
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
	textInputBox: {
		height: hp(6),
		width: wp(90),
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		borderRadius: wp(4),
		padding: wp(3)
	},
	textInput: {
		...FONTS.bold15,
		height: hp(4),
		width: wp(75),
		color: '#333333',
		paddingRight: wp(5),
		paddingVertical: 0,
		textAlign: 'right',
		alignSelf: 'center'
	},
	microsoft: {
		width: 27,
		height: 27,
		alignSelf: 'center'
	}
})
