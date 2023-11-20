import {
	Animated,
	Image,
	Modal,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { ModalContent } from "../modal/ModalContent";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { setNotesList } from "../store/slice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../theme/ThemeContext";
import { darkTheme, lightTheme } from "../theme/theme";

export const getCurrentDay = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};
export const formatDate = (inputDateStr, t) => {
	const inputDate = new Date(inputDateStr);
	const day = inputDate.getDate();
	const monthNames = [
		t("January"),
		t("February"),
		t("March"),
		t("April"),
		t("May"),
		t("June"),
		t("July"),
		t("August"),
		t("September"),
		t("October"),
		t("November"),
		t("December")
	];
	const month = monthNames[inputDate.getMonth()];
	const year = inputDate.getFullYear();
	return `${day} ${month} ${year}`;
}
export const formatDateMarket = (inputDateStr) => {
	const inputDate = new Date(inputDateStr);
	const year = inputDate.getFullYear();
	const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
	const day = inputDate.getDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
}
export const formatTime = (currentDate) => {
	const currentHours = currentDate.getHours();
	const currentMinutes = currentDate.getMinutes();

	const formatNumber = (num) => (num < 10 ? `0${num}` : num);
	return `${formatNumber(currentHours)}:${formatNumber(currentMinutes)}`;
}

export const footerComponent = (navigation) => {
	const route = useRoute();
	const currentRouteName = route.name;

	return (
		<View style={{
			position: 'absolute',
			bottom: 2,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
			gap: 50,
		}}>
			<TouchableOpacity onPress={() => navigation.navigate('Main')}>
				<Image source={
					currentRouteName === 'Main'?
						require('../assets/home_alt_fill.png')
						: require('../assets/home-icon.png') } style={{width: 50, height: 50}}/>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=> navigation.navigate('Calendar')}>
				<Image source={currentRouteName === 'Calendar'?
					require('../assets/calendar-selecteed.png')
					: require('../assets/calendar-gray.png')
				} style={{width: 40, height: 40}}/>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=> navigation.navigate('Weather')}>
				<Image source={currentRouteName === 'Weather'?
					require('../assets/iselected-clouds.png')
					: require('../assets/gray-cloud.png')
				} style={{width: 50, height: 50}}/>
			</TouchableOpacity>
		</View>
	)
}
export const renderSearchByName = (listNotes) => {
	return (
		<View style={styles.filterContainer}>
			<Text style={styles.filterText}>Tasks</Text>
			<TextInput
				style={styles.filterInput}
				placeholder="Type Task"
			/>
			<Icon name="search" size={18} style={{ position: 'absolute', right: 10, top: 5 }} />
		</View>
	)
}

const styles = StyleSheet.create({
	container1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	swipeable: {
		width: 200,
		height: 100,
		backgroundColor: 'lightblue',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		display: 'flex',
		margin: 25,
		alignItems: 'center',
		flex: 1,
	},
	titleText: {
		fontSize: 24,
		fontWeight: 500,
	},
	dayTitle: {
		margin: 10,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 500,
	},
	categoryBox: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 15,
	},
	categoryCard: {
		width: 340,
		height: 340,
	},
	backgroundImage: {
		display: 'flex',
		width: 300,
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
	},
	categoryCardText: {
		fontSize: 32,
		fontWeight: 600,
		color: 'white',
		textTransform: 'uppercase',
		textAlign: 'center'
	},
	paginationContainer: {
		position: 'absolute',
		right: 0,
		left: 0,
		bottom: -30,
	},
	paginationDot: {
		width: 10,
		height: 10,
		borderRadius: 10,
		marginHorizontal: 8,
		backgroundColor: 'purple',
	},
	filterContainer: {
		marginTop: 20,
		display: 'flex',
		width: '100%',
		justifyContent: "space-between",
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},
	filterText: {
		color: '#2E3A59',
		fontSize: 24,
		fontWeight: 500,
	},
	filterInput: {
		padding: 8,
		width: '80%',
		borderRadius: 20,
		backgroundColor: '#E5EAFC',
	},
	listCard: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 15,
		marginTop: 7,
		width: '100%',
		borderColor: 'gray',
		borderWidth: 1,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 5,
	},
	notesBox: {
		width: '100%',
		display: 'flex',
		height: '40%',
		flexDirection: 'column',
		gap: 7,
	},
	listInfo: {
		display: "flex",
		flexDirection: 'column',
		justifyContent: 'center',
	},
	listInfoText: {
		fontSize: 18,
		color: '#242736',
		fontWeight: 500,
	},
	listInfoDate: {
		fontSize: 14,
		color: '#AEAEB3',
		fontWeight: 500,
	},
	swipeContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
		borderRadius: 10,
		marginTop: 10,
	},
	swipeBoxDelete: {
		display: 'flex',
		backgroundColor: 'red',
		borderRadius: 10,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	swipeBoxEdit: {
		display: 'flex',
		backgroundColor: '#6129a9',
		width: '100%',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
