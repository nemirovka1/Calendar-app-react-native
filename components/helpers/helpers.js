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
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { ModalContent } from "../modal/ModalContent";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { setNotesList } from "../store/slice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export const getCurrentDay = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};
export const formatDate = (inputDateStr) => {
	const inputDate = new Date(inputDateStr);
	const day = inputDate.getDate();
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
export const renderListNotes = (listNotes) => {
	const [noteChecked, setNoteChecked] = useState(Array(listNotes.length).fill(false));
	const [isModalVisible, setModalVisible] = useState(false)
	const [modalId, setModalId] = useState(null)
	const dispatch = useDispatch()
	const { t } = useTranslation()

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

	const handleDeleteTask = (id) => {
		const filterTasksList = listNotes.filter((el) => el.id !== id)
		dispatch(setNotesList(filterTasksList));
	}

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
				{listNotes.map((el, id) => (
					<GestureHandlerRootView>
						<Swipeable
							friction={1}
							useNativeDriver={true}
							renderRightActions={()=> rightSwipe(el.id)}
							renderLeftActions={() => leftSwipe(el.id)}>
							<TouchableOpacity style={styles.listCard} key={id}>
								<View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
									<Image source={require('../assets/Card.png')} style={{width: 50, height: 50}}/>
									<View style={styles.listInfo}>
										<Text style={styles.listInfoText}>{t(el.title)}</Text>
										<Text style={styles.listInfoDate}>{formatDate(el.startDate)}</Text>
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
		justifyContent: 'space-between',
		gap: 15,
		marginTop: 10,
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
	},
	notesBox: {
		width: '100%',
		display: 'flex',
		marginTop: 20,
		height: '33%',
		flexDirection: 'column',
		gap: 10,
	},
	listInfo: {
		display: "flex",
		flexDirection: 'column',
	},
	listInfoText: {
		fontSize: 18,
		color: '#242736',
		fontWeight: 500,
	},
	listInfoDate: {
		fontSize: 14,
		marginTop: 7,
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
