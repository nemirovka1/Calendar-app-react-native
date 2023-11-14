import {
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import React, { useState } from 'react';
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setNotesList } from "../store/slice";
import { selectNotesList } from "../store/selectors";
import { useTranslation } from "react-i18next";

export const ModalContent = ({closeModal, id, editTask}) => {
	const listNotes = useSelector(selectNotesList)
	const dispatch = useDispatch()
	const [eventType, setEventType] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation()

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
			console.log({updatedNote})

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

	const onChangeStartTime = (event, selectedDate, setFieldValue) => {
		if (selectedDate) {
			setFieldValue('startDate', selectedDate);
		}
	};
	const onChangeEndTime = (event, selectedDate, setFieldValue) => {
		if (selectedDate) {
			setFieldValue('endDate', selectedDate);
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
					{({ handleChange, handleBlur, handleSubmit, values, errors , setFieldValue}) => (
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
										<SafeAreaView style={styles.modalSection} >
											<View style={styles.dropdownGender}>
												<Text style={styles.textInputLabel}>{ t( "Category" ) }</Text>
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
													customItemContainerStyle={{
														backgroundColor: 'red',
													}}
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
							<View style={styles.modalSectionTime}>
								<SafeAreaView style={{ gap: 20 }}>
									<TouchableOpacity style={styles.dateBox}>
										<Text style={styles.dateText}>{t("Starts")}</Text>
											<SafeAreaView style={styles.timeBox}>
												<DateTimePicker
													testID="startDateTimePicker"
													value={values.startDate}
													mode={'date'}
													is24Hour={true}
													onChange={(event, selectedDate) => onChangeStartTime(event, selectedDate, setFieldValue)}
												/>
												<DateTimePicker
													testID="startDateTimePicker"
													value={values.startDate}
													mode={'time'}
													is24Hour={true}
													onChange={(event, selectedDate) => onChangeStartTime(event, selectedDate, setFieldValue)}
												/>
											</SafeAreaView>
									</TouchableOpacity>
									<View style={styles.separator} />
									<TouchableOpacity style={styles.dateBox}>
										<Text style={styles.dateText}>{t("Ends")}</Text>
										<SafeAreaView style={styles.timeBox}>
											<DateTimePicker
												testID="endDateTimePicker"
												value={values.endDate}
												mode={'date'}
												is24Hour={true}
												onChange={(event, selectedDate) => onChangeEndTime(event, selectedDate, setFieldValue)}
											/>
											<DateTimePicker
												testID="endDateTimePicker"
												value={values.endDate}
												mode={'time'}
												is24Hour={true}
												onChange={(event, selectedDate) => onChangeEndTime(event, selectedDate, setFieldValue)}
											/>
										</SafeAreaView>
									</TouchableOpacity>
									</SafeAreaView>
								<View style={{marginTop: 50}}>
									<Text style={{color: '#182965', fontSize: 18, marginBottom: 12}}>{t("Description")}</Text>
									<TextInput
										style={styles.textInput}
										onChangeText={handleChange('description')}
										onBlur={handleBlur('description')}
										value={values.description}
										placeholderTextColor={'#2E3A59'}
										placeholder={t("DescText")}
									/>
								</View>
									<TouchableOpacity
										onPress={handleSubmit}
										style={styles.btnContainer}
									>
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
		marginTop: 10,
		padding: 10,
		gap: 15,
		borderRadius: 8,
	},
	modalContent: {
		display: 'flex',
		gap: 5,
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
		color: 'red',
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
		marginTop: 150,
		width: '100%',
		height: 60,
	},
	createBtnText: {
		textAlign: 'center',
		fontSize: 22,
		fontWeight: 500,
		color: 'white',
	}
});
