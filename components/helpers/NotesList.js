import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../theme/ThemeContext";
import { setNotesList } from "../store/slice";
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { darkTheme, lightTheme } from "../theme/theme";
import { CheckBox } from "react-native-elements";
import { ModalContent } from "../modal/ModalContent";
import { formatDate } from "./helpers";

export const NotesList = ({ listNotes }) => {
	const [noteChecked, setNoteChecked] = useState(Array(listNotes.length).fill(false));
	const [isModalVisible, setModalVisible] = useState(false)
	const [modalId, setModalId] = useState(null)
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { theme } = useContext(ThemeContext);

	if(!listNotes || listNotes.length === 0) return null
	const toggleModal = () => {
		setModalVisible(!isModalVisible)
	};
	const toggleNoteCheck = (id) => {
		const updatedChecked = [...noteChecked]
		updatedChecked[id] = !updatedChecked[id]
		setNoteChecked(updatedChecked)
	}
	const handleModalOpen = (id) => {
		setModalVisible(true);
		setModalId(id);
	};

	const handleDeleteTask = async (id) => {
		const filterTasksList = listNotes.filter((el) => el.id !== id);
		await dispatch(setNotesList(filterTasksList));
	};

	const leftSwipe = (id) => {
		return (
			<View style={styles.swipeContainer}>
				<TouchableOpacity style={styles.swipeBoxDelete} onPress={() => handleDeleteTask(id)}>
					<Icon name="trash" size={24} color={'white'}/>
				</TouchableOpacity>
			</View>
		)
	}
	const rightSwipe = (id) => {
		return (
			<View style={styles.swipeContainer}>
				<TouchableOpacity style={styles.swipeBoxEdit} onPress={() => handleModalOpen(id)}>
					<Icon name="edit" size={24} color={'white'}/>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.notesBox}>
			<ScrollView>
				{(listNotes || []).map((el, id) => (
					<GestureHandlerRootView>
						<Swipeable
							friction={1}
							useNativeDriver={true}
							renderRightActions={()=> rightSwipe(el.id)}
							renderLeftActions={() => leftSwipe(el.id)}>
							<TouchableOpacity style={[styles.listCard, { backgroundColor: theme === darkTheme ? 'rgba(255,255,255,0.81)' : lightTheme.backgroundColor}]}key={id}>
								<View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center'}}>
									<Image source={require('../assets/Card.png')} style={{width: 50, height: 50}}/>
									<View style={styles.listInfo}>
										<Text style={styles.listInfoText}>{t(el.title)}</Text>
										<Text style={styles.listInfoDate}>{formatDate(el.startDate, t)}</Text>
									</View>
								</View>
								<CheckBox
									title=""
									checked={noteChecked[id]}
									onPress={() => toggleNoteCheck(id)}
								/>
								<Modal
									animationType="slide"
									transparent={isModalVisible}
									visible={isModalVisible}
									onRequestClose={toggleModal}
								>
									<ModalContent
										closeModal={() => setModalVisible(false)}
										id={modalId}
										editTask
									/>
								</Modal>
							</TouchableOpacity>
						</Swipeable>
					</GestureHandlerRootView>
				))}
			</ScrollView>
		</SafeAreaView>
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
