import React, { useState, useRef, useMemo, useContext } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	Modal,
	Button,
	TextInput, ImageBackground, TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ModalContent } from "./modal/ModalContent";
import { footerComponent, formatDate, formatDateMarket, getCurrentDay } from "./helpers/helpers";
import { useSelector } from "react-redux";
import { selectNotesList } from "./store/selectors";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "./theme/ThemeContext";

export function CustomCalendar(props) {
	const listNotes = useSelector(selectNotesList)
	const [selected, setSelected] = useState(getCurrentDay());

	const marked = useMemo(() => {
		return listNotes.reduce((markedDates, el) => {
			markedDates[selected] = {
				customStyles: {
					container: {
						backgroundColor: 'purple',
						borderRadius: 10,
						alignSelf: 'center',
					},
					text: {
						color: 'white',
					},
				},
			};
			markedDates[formatDateMarket(el.startDate)] = {
				marked: true,
				color: 'red', selectedDotColor: 'reds'
			};
			return markedDates;
		}, {});
	}, [selected]);

	return (
		<View>
			<Calendar
				initialDate={getCurrentDay()}
				onDayPress={(day) => {
					setSelected(day.dateString);
					props.onDaySelect && props.onDaySelect(day);
				}}
				markedDates={marked}
				markingType={'custom'}
				theme={{
					backgroundColor: '#D8DEF3',
					calendarBackground: '#f5f2f2',
					textSectionTitleColor: 'purple',
					textDayFontSize: 18,
					textMonthFontSize: 25,
					arrowColor: 'purple',
				}}
				style={{
					borderRadius: 10,
					margin: 12,
					padding: 12,
					borderWidth: 0,
					fontSize: 10,
					border: 'none',
				}}
				{...props}
			/>
		</View>
	);
}

export default function CalendarPage({ navigation }) {
	const [selectedDate, setSelectedDate] = useState(getCurrentDay());
	const [isModalVisible, setModalVisible] = useState(false)
	const calendarRef = useRef(null);
	const { t } = useTranslation()
	const { theme, toggleTheme } = useContext(ThemeContext);

	const toggleModal = () => {
		setModalVisible(!isModalVisible)
	};

	return (
		<SafeAreaView style={[styles.box, { backgroundColor: theme.backgroundColor }]}>
			<View style={styles.box}>
				<ImageBackground
					style={styles.backgroundImg}
					source={require('./assets/CalendarBacground.png')}
				>
					<View style={styles.container}>
						<Text style={styles.text}> {t("Calendar")}</Text>
						<View style={styles.calendarContainer}>
							<CustomCalendar onDaySelect={(day) => console.log(`Date selected: ${day.dateString}`)}
							/>
						</View>
					</View>
				</ImageBackground>
				<TouchableOpacity
					onPress={()=> setModalVisible(true)}
					style={styles.btnContainer}
				>
					<Text style={styles.createBtnText}>{t("Create Task")}</Text>
				</TouchableOpacity>
				{footerComponent(navigation)}
				<Modal
					animationType="slide"
					transparent={isModalVisible}
					visible={isModalVisible}
					onRequestClose={toggleModal}
				>
					<ModalContent closeModal={()=> setModalVisible(false)}/>
				</Modal>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	box: {
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	backgroundImg: {
		display: 'flex',
		width: '100%',
		height: '85%',
		alignItems: 'center',
	},
	container: {
		display: 'flex',
		alignItems: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: 42,
		fontWeight: "bold",
		color: 'white',
		marginTop: 35,
	},
	calendarContainer: {
		width: 420,
		marginTop: 30,
		borderRadius: 28,
		justifyContent: 'center',
	},
	todayButton: {
		textAlign: 'center',
		fontSize: 20,
		color: 'blue',
		marginBottom: 10,
	},
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: '#413a39',
	},
	btnContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: '#6435f5',
		width: 350,
		height: 60,
	},
	createBtnText: {
		textAlign: 'center',
		fontSize: 22,
		fontWeight: 500,
		color: 'white',
	}
});

