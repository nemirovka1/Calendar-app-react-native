import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export const ConfirmLocationModal = ({closeModal, closeMapModal, location, onLocationSelect}) => {

	const confirmLocation = () => {
		onLocationSelect(location)
		closeModal()
		closeMapModal()
	}

	return (
		<View style={styles.modalContainer}>
			<Text style={styles.mainText}>Confirm location</Text>
			<View style={styles.infoBox}>
				<Text style={styles.locationText}>Selected Location</Text>
				<Text style={styles.selectedLocation}>{location}</Text>
			</View>
			<View style={styles.btnContainer}>
				<TouchableOpacity onPress={confirmLocation}>
					<Text style={styles.textBtn}>Confirm</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={closeModal}>
					<Text style={styles.textBtn}>Cancel</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		width: 300,
		height: 250,
		position: 'absolute',
		top: '50%',
		left: 210,
		marginLeft: -200,
		marginTop: -170,
		borderRadius: 20,
		padding: 30,
		backgroundColor: '#3b24c7',
	},
	mainText: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 32,
		fontWeight: 500,
		marginBottom: 30,
	},
	infoBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 15,
		borderRadius: 10,
	},
	btnContainer: {
		display: "flex",
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	locationText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 500,
	},
	selectedLocation: {
		padding: 8,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: 9,
		fontSize: 16,
		fontWeight: 500,
		color: '#fff',
	},
	textBtn: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 500,
	}
});
