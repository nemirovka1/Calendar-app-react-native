import React, { useState, useRef, useMemo } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	Modal,
	Button,
	TextInput,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ModalContent } from "./modal/ModalContent";
import { getCurrentDay } from "./helpers/helpers";

export function CustomCalendar(props) {
	const [selected, setSelected] = useState(getCurrentDay());

	const marked = useMemo(() => ({
		[selected]: {
			customStyles: {
				container: {
					backgroundColor: 'green',
					borderRadius: 0,
				},
				text: {
					color: 'white',
				}
			}
		}
	}), [selected]);

	return (
		<View>
			<Calendar
				initialDate={getCurrentDay()}
				markingType="custom"
				markedDates={marked}
				onDayPress={(day) => {
					setSelected(day.dateString);
					props.onDaySelect && props.onDaySelect(day);
				}}
				style={{
					borderRadius: 10,
					margin: 12,
					borderWidth: 1,
					borderColor: 'rgba(5, 5, 100, 0.2)',
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

	const toggleModal = () => {
		setModalVisible(!isModalVisible)
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>- Calendar -</Text>
			<Button title={'Add Notes'} onPress={()=> setModalVisible(true)}/>
			<View style={styles.calendarContainer}>
				<CustomCalendar onDaySelect={(day) => console.log(`Date selected: ${day.dateString}`)}
				/>
			</View>
			<Modal
				animationType="slide"
				transparent={isModalVisible}
				visible={isModalVisible}
				onRequestClose={toggleModal}
			>
				<ModalContent closeModal={()=> setModalVisible(false)}/>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0a8faf',
	},
	text: {
		textAlign: 'center',
		fontSize: 30,
		color: 'white',
		marginTop: 35,
	},
	calendarContainer: {
		flex: 2,
		justifyContent: 'center',
	},
	todayButton: {
		textAlign: 'center',
		fontSize: 20,
		color: 'blue',
		marginBottom: 10,
	},
	modal: {
		marginTop: 70,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: '#413a39',
	},
});

