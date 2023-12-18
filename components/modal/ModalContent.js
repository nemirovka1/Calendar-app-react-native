import {
	Image,
	ImageBackground, Modal,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity, Vibration,
	View
} from "react-native";
import React, { useContext, useState } from 'react';
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ErrorMessage, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setNotesList } from "../store/slice";
import { selectNotesList } from "../store/selectors";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../theme/ThemeContext";
import { validationSchema } from "./validationSchema";
import { AddLocationPageModal } from "../pages/LocationPage";

export const ModalContent = ({closeModal, id, editTask, navigation}) => {
	const listNotes = useSelector(selectNotesList)
	const dispatch = useDispatch()
	const [eventType, setEventType] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation()
	const { theme } = useContext(ThemeContext);
	const [isDatePickerEndVisible, setDatePickerEndVisibility] = useState(false)
	const [isDatePickerStartVisible, setDatePickerStartVisibility] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);
    const [openLocationModal, setOpenLocationModal] = useState(false)
	const handleLocationSelect = (location) => {
		setSelectedLocation(location);
	};

	let initialValues;

	if (id) {
		const filterListNotes = listNotes.find((el) => el.id === id);
		initialValues = {
			title: filterListNotes.title,
			description: filterListNotes.description,
			startDate: filterListNotes.startDate,
			endDate: filterListNotes.endDate,
			location: filterListNotes.location,
		};
	} else {
		initialValues = {
			title: '',
			description: '',
			startDate: new Date(),
			endDate: new Date(),
			location: '',
		};
	}

	const updateNote = (id, updatedValues) => {
		const index = listNotes.findIndex((el) => el.id === id);
		if (index !== -1) {
			const updatedNote = {
				...listNotes[index],
				...updatedValues,
				location: selectedLocation,
			};
			const updatedListNotes = [...listNotes];
			updatedListNotes[index] = updatedNote;
			dispatch(setNotesList(updatedListNotes));
		}
	};


	const handleSubmit = (values) => {
		Vibration.vibrate()


		if (id) {
			updateNote(id, values);
		} else {
			const newNote = { ...values, id: Math.random(), eventType: eventType, location: selectedLocation };
			dispatch(setNotesList([...listNotes, newNote]));
		}
		closeModal();
	};

	const onChangeStartTime = (event, selectedDate, setFieldValue) => {
		if (selectedDate) {
			setFieldValue('startDate', selectedDate);
			setDatePickerStartVisibility(false);
		}

	};
	const onChangeEndTime = (event, selectedDate, setFieldValue) => {
		if (selectedDate) {
			setFieldValue('endDate', selectedDate);
			setDatePickerEndVisibility(false)
		}
	};

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const toggleModal = () => {
		setOpenLocationModal(!openLocationModal)
	};


	return (
		<View style={styles.modalContainer}>
			<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ handleChange, handleBlur, handleSubmit, values, setFieldValue, isValid, errors}) => (
						<View style={{width: '100%', height: '100%' }}>

							<ImageBackground source={require('../assets/CalendarBacground.png')} style={styles.bgcImage}>
								<SafeAreaView style={styles.container}>
									<View style={{width: '100%', padding: 10}}>
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
														placeholderStyle={{ color: 'white', fontSize: 16 }}
														topOffset={null}
														placeholder={t( "Choose category" )}
													/>
												{(!eventType.length && !isValid) && <Text style={{ color: '#f11616', fontSize: 12, fontWeight: 400 }}>Choose Category</Text>}
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
												<ErrorMessage name="title" component={Text} style={{ color: '#f11616', fontSize: 12, fontWeight: 400 }} />
												<View style={styles.separator} />
											</SafeAreaView>
										</SafeAreaView>
									</View>
								</SafeAreaView>
							</ImageBackground>
							<View style={[styles.modalSectionTime, { backgroundColor: theme.backgroundColor }]}>
								<View>
									<SafeAreaView style={{ gap: 5 }}>
										<TouchableOpacity style={styles.dateBox}>
											<Text style={[styles.dateText, { color: theme.textColor }]}>{t("Starts")}</Text>
											<SafeAreaView style={styles.timeBox}>
													<DateTimePicker
														testID="startDateTimePicker"
														value={values.startDate}
														mode={'date'}
														is24Hour={true}
														style={styles.dateTimeBox}
														onChange={(event, selectedDate) => onChangeStartTime(event, selectedDate, setFieldValue)}
													/>
													<DateTimePicker
														testID="startDateTimePicker"
														value={values.startDate}
														mode={'time'}
														is24Hour={true}
														style={styles.dateTimeBox}
														onChange={(event, selectedDate) => onChangeStartTime(event, selectedDate, setFieldValue)}
													/>
											</SafeAreaView>
									</TouchableOpacity>
										{errors.startDate && <Text style={{ color: '#f11616', fontSize: 14, fontWeight: 400, textAlign: 'start' }}>{errors.startDate}</Text> }
										<View style={styles.separator} />
									<TouchableOpacity style={styles.dateBox}>
										<Text style={[styles.dateText, { color: theme.textColor }]}>{t("Ends")}</Text>
											<SafeAreaView style={styles.timeBox}>
												<DateTimePicker
													testID="endDateTimePicker"
													value={values.endDate}
													mode={'date'}
													is24Hour={true}
													style={styles.dateTimeBox}
													onChange={(event, selectedDate) => onChangeEndTime(event, selectedDate, setFieldValue)}
												/>
												<DateTimePicker
													testID="endDateTimePicker"
													value={values.endDate}
													mode={'time'}
													is24Hour={true}
													style={styles.dateTimeBox}
													onChange={(event, selectedDate) => onChangeEndTime(event, selectedDate, setFieldValue)}
												/>
											</SafeAreaView>
										</TouchableOpacity>
										{errors.endDate && <Text style={{ color: '#f11616', fontSize: 14, fontWeight: 400, textAlign: 'start' }}>{errors.endDate}</Text> }
									</SafeAreaView>
									<View>
										<TouchableOpacity onPress={() => setOpenLocationModal(true)} style={styles.locationContainer}>
											<Text style={[styles.dateText, { color: theme.textColor }]}>{t('Add Location')}</Text>
										</TouchableOpacity>
										<View style={styles.locationContainer}>
											{selectedLocation ? <Image source={require('../assets/icons8-маркер-48.png')} style={{width: 24, height: 24}}/> : null}
											<Text style={styles.locationText}>{selectedLocation || values.location}</Text>
										</View>
									</View>
									<View>
										<Text style={[styles.descriptionText, { color: theme.textColor }]}>{t("Description")}</Text>
										<TextInput
											style={styles.textInputDesc}
											onChangeText={handleChange('description')}
											onBlur={handleBlur('description')}
											value={values.description}
											placeholderTextColor={theme.textColor}
											placeholder={t("DescText")}
										/>
									</View>
								</View>
								<Modal
									animationType="slide"
									transparent={openLocationModal}
									visible={openLocationModal}
									onRequestClose={toggleModal}
								>
									<AddLocationPageModal
										navigation={navigation}
										closeModal={()=> setOpenLocationModal(false)}
										onLocationSelect={handleLocationSelect}
									/>
								</Modal>
								<TouchableOpacity onPress={handleSubmit} style={isValid ? styles.btnContainer : styles.btnContainerDisabled} disabled={!isValid}>
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
		paddingBottom: 10,
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
		padding: 8,
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
	dateText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#762DD2',
	},
	dropdownGender: {
		display: 'flex',
		zIndex: 10000,
		gap: 5,
		borderWidth: 0,
	},
	picker: {
		zIndex: 10000,
		borderWidth: 0,
		color: 'red',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
	placeholderStyles: {
		color: "grey",
	},
	timeBox:{
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
		padding: 10,
		backgroundColor: '#e0d7d5',
	},
	btnContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: '#6435f5',
		marginTop: 10,
		width: '100%',
		height: 60,
	},
	addLocationBtn: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: '#6435f5',
		marginTop: 70,
		width: '100%',
		height: 60,
	},
	btnContainerDisabled: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: 'gray',
		marginTop: 10,
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
		fontSize: 20,
		marginBottom: 10,
	},
	dateTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#762DD2',
	},
	locationContainer: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 7,
		marginTop: 10,
	},
	locationText: {
		fontSize: 16,
		fontWeight: 500,
	},
	dateTimeBox:{
		borderRadius: 8,
	}

});
