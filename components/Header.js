import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function  Header() {
	return (
		<View style={styles.main}>
			<Text style={styles.text}>Notes List</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		padding: 10,
		height: 50,
		backgroundColor: 'silver',
	},
	text: {
		fontSize: 20,
		color: 'red',
		textAlign: 'center',
	}
});

