import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeGenerator({closeModal}) {

	return (
		<View style={styles.wrapper}>
			<TouchableOpacity style={styles.closeButton} onPress={closeModal}>
				<Text style={styles.closeButton}>✕</Text>
			</TouchableOpacity>
			<View style={styles.qrCode}>
				<QRCode value={'exp://192.168.1.129:19000'|| ''} size={200} color="black" backgroundColor="white" />
			</View>
		</View>

	);
}

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: 'center',
		width: '80%',
		position: "absolute",
		top: '25%',
		right: '10%',
		height: 280,
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		borderRadius: 10,
	},
	closeButton: {
		position: 'absolute',
		right: 5,
		top: 5,
		fontSize: 22,
		fontWeight: 1000,
		color: 'black',
	},
	qrCode: {
		marginTop: 20,
		alignItems: 'center',
	},
	scanButton: {
		marginTop: 10,
		padding: 10,
		backgroundColor: 'blue',
		borderRadius: 5,
	},
	scanButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
});
