import {
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import React, { useContext, useState } from 'react';
import DropDownPicker from "react-native-dropdown-picker";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setNotesList } from "../store/slice";
import { selectNotesList } from "../store/selectors";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../theme/ThemeContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate, formatTime } from "../helpers/helpers";

export const ModalContent = ({closeModal, id, editTask}) => {
	const listNotes = useSelector(selectNotesList)
	const dispatch = useDispatch()
	const [eventType, setEventType] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation()
	const { theme } = useContext(ThemeContext);
	const [isDatePickerEndVisible, setDatePickerEndVisibility] = useState(false)
	const [isDatePickerStartVisible, setDatePickerStartVisibility] = useState(false);

	let initialValues;
	if (id) {
		const filterListNotes = listNotes.find((el) => el.id === id);

		initialValues = {
			title: filterListNotes.title,
			description: filterListNotes.description,
			startDate: filterListNotes.startDate,
			endDate: filterListNotes.endDate
		};
	} else {
		initialValues = {
			title: '',
			description: '',
			startDate: new Date(),
			endDate: new Date(),
		};
	}

	const updateNote = (id, updatedValues) => {
		const index = listNotes.findIndex((el) => el.id === id);
		if (index !== -1) {
			const updatedNote = {
				...listNotes[index],
				...updatedValues,
			};
			const updatedListNotes = [...listNotes];
			updatedListNotes[index] = updatedNote;
			dispatch(setNotesList(updatedListNotes));
		}
	};

	const handleSubmit = (values) => {
		if (id) {
			updateNote(id, values);
		} else {
			const newNote = { ...values, id: Math.random(), eventType: eventType };
			dispatch(setNotesList([...listNotes, newNote]));
		}
		closeModal();
	};

	const onChangeStartTime = (selectedDate, setFieldValue) => {
		if (selectedDate) {
			setFieldValue('startDate', selectedDate);
			setDatePickerStartVisibility(false);
		}

	};
	const onChangeEndTime = (selectedDate, setFieldValue) => {
		if (selectedDate) {
			setFieldValue('endDate', selectedDate);
			setDatePickerEndVisibility(false)
		}
	};

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<View style={styles.modalContainer}>
				<Formik
					initialValues={initialValues}
					// validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
						<View style={{width: '100%', height: '100%' }}>
							<ImageBackground source={require('../assets/CalendarBacground.png')} style={styles.bgcImage}>
								<SafeAreaView style={styles.container}>
									<View style={{width: '100%', padding: 20}}>
										<View style={styles.managementBtn}>
											<TouchableOpacity onPress={closeModal}>
												<Text style={styles.btnTitle}>{t("Cancel")}</Text>
											</TouchableOpacity>
										</View>
										<Text style={styles.modalTitle}>{editTask? t("Edit Task") : t("Create Task")}</Text>
										<SafeAreaView style={styles.modalSection}>
											<View style={styles.dropdownGender}>
												<Text style={styles.textInputLabel}>{t("Category")}</Text>
												<DropDownPicker
													style={styles.picker}
													open={isOpen}
													setOpen={toggleOpen}
													value={eventType}
													items={[
														{ label: t('Home'), value: 'home', color: 'green' },
														{ label: t('Work'), value: 'work', color: 'orange' },
														{ label: t('University'), value: 'university', color: 'red' },
													]}
													setValue={setEventType}
													placeholderStyle={{
														color: 'white',
														fontSize: 16,
													}}
													topOffset={null}
													placeholder={t( "Choose category" )}
												/>
											</View>
											<SafeAreaView style={styles.modalContent}>
												<Text style={styles.textInputLabel}>{t("Name")}</Text>
												<TextInput
													style={styles.textInput}
													onChangeText={handleChange('title')}
													onBlur={handleBlur('title')}
													value={values.title}
													placeholderTextColor={'white'}
													placeholder={ t("Title")}
												/>
												<View style={styles.separator} />
											</SafeAreaView>
										</SafeAreaView>
									</View>
								</SafeAreaView>
							</ImageBackground>
							<View style={[styles.modalSectionTime, { backgroundColor: theme.backgroundColor }]}>
								<View>
									<SafeAreaView style={{ gap: 20 }}>
										<TouchableOpacity style={styles.dateBox}>
											<Text style={[styles.dateText, { color: theme.textColor }]}>{t("Starts")}</Text>
											<SafeAreaView style={styles.timeBox}>
												<TouchableOpacity onPress={()=> setDatePickerStartVisibility(true)}>
													<Text style={styles.dateTitle}>{values.startDate ? `${formatDate(values.startDate, t)} - ${formatTime(values.startDate, t)}` : 'Select Date' }</Text>
												</TouchableOpacity>
												{isDatePickerStartVisible && (
													<DateTimePickerModal
														isVisible={isDatePickerStartVisible}
														testID="startDateTimePicker"
														value={values.startDate}
														mode={'datetime'}
														is24Hour={true}
														onConfirm={(selectedDate) => onChangeStartTime(selectedDate, setFieldValue)}
														onCancel={() => setDatePickerStartVisibility(false)}
													/>
												)}
											</SafeAreaView>
										</TouchableOpacity>
										<View style={styles.separator} />
										<TouchableOpacity style={styles.dateBox}>
											<Text style={[styles.dateText, { color: theme.textColor }]}>{t("Ends")}</Text>
											<SafeAreaView style={styles.timeBox}>
												<TouchableOpacity onPress={()=> setDatePickerEndVisibility(true)}>
													<Text style={styles.dateTitle}>{values.endDate ?  `${formatDate(values.endDate, t)} - ${formatTime(values.endDate, t)}` : 'Select Date' }</Text>
												</TouchableOpacity>
												{isDatePickerEndVisible && (
													<DateTimePickerModal
														isVisible={isDatePickerEndVisible}
														testID="endDateTimePicker"
														value={values.endDate}
														mode={'datetime'}
														is24Hour={true}
														onConfirm={(selectedDate) => onChangeEndTime(selectedDate, setFieldValue)}
														onCancel={() => setDatePickerEndVisibility(false)}
													/>
												)}
											</SafeAreaView>
										</TouchableOpacity>
									</SafeAreaView>
									<View style={{marginTop: 30}}>
										<Text style={[styles.descriptionText, { color: theme.textColor }]}>{t("Description")}</Text>
										<TextInput
											style={styles.textInput}
											onChangeText={handleChange('description')}
											onBlur={handleBlur('description')}
											value={values.description}
											placeholderTextColor={theme.textColor}
											placeholder={t("DescText")}
										/>
									</View>
								</View>

								<TouchableOpacity onPress={handleSubmit} style={styles.btnContainer}>
										<Text style={styles.createBtnText}>{editTask? t('Update Task') : t('Add Task')}</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</Formik>
		</View>

	)
}

const styles = StyleSheet.create({
	modalContainer: {
		width: '100%',
		height: '100%',
	},
	bgcImage: {
		width: '100%',
		paddingBottom: 30,
	},
	text: {
		padding: 20,
		margin: 20,
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	},
	modalSection: {
		marginTop: 5,
		padding: 5,
		gap: 10,
		borderRadius: 8,
	},
	modalContent: {
		display: 'flex',
		width: '100%',
	},
	managementBtn: {
		display: 'flex',
	},
	btnTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
	},
	textInput: {
		color: '#fff',
		fontSize: 18,
		padding: 10,
	},
	separator: {
		height: 0.7,
		backgroundColor: '#e0d7d5',
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
		fontSize: 24,
		fontWeight: 'bold',
		color: '#762DD2',
	},
	dropdownGender: {
		display: 'flex',
		gap: 16,
		marginBottom: 20,
		borderWidth: 0,
	},
	picker: {
		borderWidth: 0,
		textDecorationColor: '#fff',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
	placeholderStyles: {
		color: "grey",
	},
	timeBox:{
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
	},
	modalTitle: {
		textAlign: 'center',
		fontSize: 28,
		fontWeight: "bold",
		color: 'white',
	},
	textInputLabel: {
		color: 'white',
		fontSize: 18,
	},
	modalSectionTime: {
		height: '100%',
		width: '100%',
		borderRadius: 20,
		paddingTop: 35,
		padding: 30,
		backgroundColor: 'white',
	},
	btnContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: '#6435f5',
		marginTop: 70,
		width: '100%',
		height: 60,
	},
	createBtnText: {
		textAlign: 'center',
		fontSize: 22,
		fontWeight: 500,
		color: 'white',
	},
	descriptionText: {
		color: '#182965',
		fontSize: 18,
		marginBottom: 12
	},
	dateTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#762DD2',
	}
});
