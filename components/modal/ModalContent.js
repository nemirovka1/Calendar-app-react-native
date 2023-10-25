import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import React, {useState} from 'react';
import { formatDate, formatTime } from "../helpers/helpers";
import { getCurrentDay } from "../helpers/helpers";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from "formik";
export const ModalContent = ({closeModal}) => {
	const [titleText, setTitleText] = useState('');
	const [descriptionText, setDescriptionText] = useState('');
	const currentDay = getCurrentDay();
	const [genderOpen, setGenderOpen] = useState(false);
	const [genderValue, setGenderValue] = useState('');
	const [gender, setGender] = useState([
		{ label: 'Private', value: 'private', color: 'green' },
		{ label: 'Work', value: 'work', color: 'orange' },
		{ label: 'University', value: 'university', color: 'red' },
	]);

	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [modeEnd, setModeEnd] = useState('date')

	const [showStartPicker, setShowStartPicker] = useState(false);
	const [showEndPicker, setShowEndPicker] = useState(false);

	const onChangeStartTime = (event, selectedDate) => {
		setShowStartPicker(false);
		if (selectedDate) {
			setStartTime(selectedDate);
		}
	};

	const onChangeEndTime = (event, selectedDate) => {
		setShowEndPicker(false);
		if (selectedDate) {
			setEndTime(selectedDate);
		}
	};

	const showStartPickerFunc = () => {
		setMode('date')
		setShowStartPicker(true);
	};
	const showStartTimePickerFunc = () => {
		setMode('time')
		setShowStartPicker(true);
	};

	const showEndPickerFunc = () => {
		setShowEndPicker(true);
	};
	const showEndTimePickerFunc = () => {
		setModeEnd('time')
		setShowEndPicker(true);
	};
	const handleSubmit = (values) => {

		console.log('Form values:', values);
		closeModal();
	};

	const initialValues = {
		title: '',
		description: '',
		eventType: '',
		startTime: '',
		endTime: '',
	}
	return (
		<View style={styles.container}>
			<Formik
				initialValues={initialValues}
				// validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors , setFieldValue}) => (
					<View>
						<View style={styles.managementBtn}>
							<TouchableOpacity onPress={closeModal}>
								<Text style={styles.btnTitle}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={handleSubmit}>
								<Text style={styles.btnTitle}>Add</Text>
							</TouchableOpacity>
						</View>
						<SafeAreaView style={styles.modalSection} >
							<SafeAreaView style={styles.modalContent}>
								<TextInput
									onChangeText={handleChange('title')}
									onBlur={handleBlur('title')}
									value={values.title}
									placeholder="Title"
								/>
								<View style={styles.separator} />
								<TextInput
									onChangeText={handleChange('description')}
									onBlur={handleBlur('description')}
									value={values.description}
									placeholder="Description"
								/>
							</SafeAreaView>
						</SafeAreaView>
						<SafeAreaView style={styles.modalSection}>
							<TouchableOpacity style={styles.dateBox}>
								<Text style={styles.dateText}>Starts</Text>
								<SafeAreaView>
									<SafeAreaView style={styles.timeBox}>
										<TouchableOpacity style={styles.dateBtn} onPress={showStartPickerFunc}>
											<Text>{formatDate(startTime)}</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.dateBtn} onPress={showStartTimePickerFunc}>
											<Text>{formatTime(startTime)}</Text>
										</TouchableOpacity>
									</SafeAreaView>
									{showStartPicker && (
										<DateTimePicker
											testID="startDateTimePicker"
											value={startTime}
											mode={mode}
											is24Hour={true}
											onChange={onChangeStartTime}
										/>
									)}
								</SafeAreaView>
							</TouchableOpacity>
							<View style={styles.separator} />
							<TouchableOpacity style={styles.dateBox}>
								<Text style={styles.dateText}>Ends</Text>
								<SafeAreaView>
									<View style={styles.timeBox}>
										<TouchableOpacity
											style={styles.dateBtn}
											onPress={showEndPickerFunc}>
											<Text>{formatDate(endTime)}</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles.dateBtn}
											onPress={showEndTimePickerFunc}>
											<Text>{formatTime(endTime)}</Text>
										</TouchableOpacity>
									</View>
									{showEndPicker && (
										<DateTimePicker
											testID="endDateTimePicker"
											value={endTime}
											mode={modeEnd}
											is24Hour={true}
											onChange={onChangeEndTime}
										/>
									)}
								</SafeAreaView>
							</TouchableOpacity>
						</SafeAreaView>
						<SafeAreaView style={styles.modalSection} >
							<TouchableOpacity style={styles.dateBox}>
								<Text style={styles.dateText}>Select Event</Text>
								<View style={styles.dropdownGender}>
									<DropDownPicker
										style={styles.picker}
										open={genderOpen}
										value={genderValue}
										items={gender}
										setOpen={setGenderOpen}
										setValue={setGenderValue}
										placeholderStyle={styles.placeholderStyles}
										setItems={setGender}
										placeholder="Select Event"
										zIndex={3000}
										zIndexInverse={1000}
										containerStyle={{ borderWidth: 0, borderColor: 'transparent' }}
									/>
								</View>
							</TouchableOpacity>
						</SafeAreaView>
					</View>
				)}
			</Formik>
		</View>
	)
}

const styles = StyleSheet.create({
	text: {
		padding: 20,
		margin: 20,
	},
	container: {
		width: '100%',
		height: '100%',
		padding: 15,
		backgroundColor: '#312f2f',
		marginTop: 70,
	},
	modalSection: {
		marginTop: 20,
		padding: 10,
		gap: 15,
		backgroundColor: '#4d3f3e',
		borderRadius: 8,
	},
	modalContent: {
		display: 'flex',
		gap: 20,
		width: '100%',
	},
	managementBtn: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	btnTitle: {
		fontSize: 15,
		color: '#b2220f',
	},
	textInput: {
		padding: 5,
	},
	separator: {
		height: 0.7,
		backgroundColor: 'gray',
		padding: 0,
		margin: 0,
	},
	dateBox: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	dateBtn: {
		padding: 7,
		backgroundColor: '#e0d7d5',
		borderRadius: 8,
	},
	dateText: {
		fontSize: 15,
		color: 'black',
	},
	dropdownGender: {
		backgroundColor: '#aba19f',
		width: "40%",
		borderWidth: 0,
	},
	picker: {
		borderColor: "#B7B7B7",
		backgroundColor: '#e0d7d5',
	},
	placeholderStyles: {
		color: "grey",
	},
	timeBox:{
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
	}
});
