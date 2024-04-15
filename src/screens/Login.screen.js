// SDKs
import React, { useState, useContext, useCallback } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({ navigation: { navigate, goBack }, route }) {
	return (
		<View>
			<Text>Login</Text>
		</View>
	)
}

const styles = StyleSheet.create({})
