import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

export const ErrorData = ({ isOpen, onClose, text, onDelete }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isOpen}
			onRequestClose={onClose}
		>
			<View style={styles.menuContainer}>
				<View style={styles.imageLogo}>
					<Image source={require('../assets/alert.png')} />
				</View>
				<View style={styles.menuContent}>
					<Text style={styles.textLogo}>{text}</Text>
				</View>
				{onDelete ? (
					<View style={styles.btnContainer}>
						<TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
							<Text style={{color: '#fff'}}>Delete</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.closeBtn} onPress={onClose}>
							<Text style={{color: '#fff'}}>Close</Text>
						</TouchableOpacity>
					</View>
				): (
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeButton}>Close</Text>
					</TouchableOpacity>
				)}

			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	menuContainer: {
		position: 'absolute',
		top: '30%',
		left: '10%',
		display: 'flex',
		width: 320,
		height: 330,
		backgroundColor: '#3b24c7',
		paddingTop: 10,
		borderRadius: 20,
	},
	closeButton: {
		position: 'absolute',
		right: '33%',
		bottom: '6%',
		backgroundColor: 'red',
		paddingRight: 33,
		paddingLeft: 33,
		paddingTop: 8,
		paddingBottom: 8,
		fontSize: 16,
		fontWeight: 500,
		borderRadius: 10,
		color: '#fff',
	},
	menuContent: {
		display: 'flex',
		gap: 30,
		padding: 10,
		paddingTop: 40,
	},
	textLogo: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 500,
		textAlign: 'center',
	},
	imageLogo: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottomText: {
		position: 'absolute',
		bottom: 0,
		right: 40,
		color: '#fff',
		padding: 10,
	},
	languageContainer: {
		display: 'flex',
		flexDirection: "column",
		gap: 10,
	},
	languageText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 400,
	},
	themeContainer: {
		display: 'flex',
		flexDirection: "column",
		gap: 10,
	},
	btnContainer: {
		display: 'flex',
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 40,
	},
	deleteBtn: {
		backgroundColor: 'red',
		paddingRight: 33,
		paddingLeft: 33,
		paddingTop: 8,
		paddingBottom: 8,
		fontSize: 16,
		fontWeight: 500,
		borderRadius: 10,
		color: '#fff',
	},
	closeBtn: {
		backgroundColor: 'black',
		paddingRight: 33,
		paddingLeft: 33,
		paddingTop: 8,
		paddingBottom: 8,
		fontSize: 16,
		fontWeight: 500,
		borderRadius: 10,
		color: '#fff',
	}
});
