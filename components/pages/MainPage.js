import {  useSelector } from "react-redux"
import { selectNotesList } from "../store/selectors"
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Image
} from "react-native"
import { footerComponent, formatDate, getCurrentDay } from "../helpers/helpers"
import Carousel, { Pagination } from "react-native-snap-carousel"
import React, { useContext, useState } from "react"
import Icon from 'react-native-vector-icons/FontAwesome'
import { useTranslation } from "react-i18next"
import { ThemeContext } from "../theme/ThemeContext"
import { NotesList } from "../helpers/NotesList"
import { SideMenu } from "../drawer/CustomDrawer"
import QRCodeGenerator from "../QrCode";

export const MainPage = ({navigation}) => {
	const listNotes = useSelector(selectNotesList)
	const [searchText, setSearchText] = useState("")
	const [activeSlide, setActiveSlide] = useState(0)
	const { t } = useTranslation()
	const { theme } = useContext(ThemeContext)

	const sortedNotesList = listNotes.slice().sort((a, b) => {
		const dateA = new Date(a.startDate)
		const dateB = new Date(b.startDate)
		return dateA - dateB
	})
	
	const cardsList = [
		{label: t("Work"), redirectTo: null},
		{label: t('University'), redirectTo: null},
		{label: t('Home'), redirectTo: null},
	]
	const [isMenuOpen, setMenuOpen] = useState(false);

	const filteredNotes = sortedNotesList.filter(note => (note?.title?.toLowerCase())?.includes(searchText.toLowerCase()))

	const openMenu = () => {
		setMenuOpen(true);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	return (
			<SafeAreaView style={[styles.container, { backgroundColor: isMenuOpen? 'rgba(0, 0, 0, 0.4)': theme.backgroundColor }]}>
					<TouchableOpacity onPress={openMenu} style={styles.settingsBox}>
						<Image source={require("../assets/Group.png")} style={{width: 25, height: 20}}/>
					</TouchableOpacity>
					<SideMenu onClose={closeMenu} isOpen={isMenuOpen}/>
					<View style={styles.box}>
						<View style={styles.introBox}>
							<Text style={[styles.titleText, { color: theme.textColor }]}>{t("Main Title")}</Text>
							<Text style={[styles.dayTitle, { color: theme.textColor }]}>{formatDate(getCurrentDay(), t)}</Text>
						</View>
						<View style={styles.categoryBox}>
							<Carousel
								data={cardsList}
								renderItem={({ item }) => (
									<TouchableOpacity onPress={()=> navigation.navigate('DetailsEvent', {label: item.label})}>
										<ImageBackground
											source={require('../assets/Card.png')}
											style={styles.backgroundImage}
										>
											<Text style={styles.categoryCardText}>{item.label}</Text>
										</ImageBackground>
									</TouchableOpacity>
								)}
								sliderWidth={250}
								itemWidth={200}
								onSnapToItem={(index) => setActiveSlide(index)}
							/>
							<Pagination
								dotsLength={cardsList.length}
								activeDotIndex={activeSlide}
								containerStyle={styles.paginationContainer}
								dotStyle={styles.paginationDot}
								inactiveDotStyle={styles.paginationDot}
								inactiveDotOpacity={0.4}
								inactiveDotScale={0.6}
							/>
						</View>
						<View style={styles.filterContainer}>
							<Text style={[styles.filterText, { color: theme.textColor }]}>{t("Tasks")}</Text>
							<TextInput
								style={styles.filterInput}
								placeholder={t("Type Task")}
								value={searchText}
								onChangeText={setSearchText}
							/>
							<Icon name="search" size={18} style={{ position: 'absolute', right: 20, top: 6 }} />
						</View>

						<View style={{height: 370}}>
							<NotesList listNotes={filteredNotes} navigation={navigation}/>

						</View>
					</View>
					<View style={styles.footerBox}>
						{footerComponent(navigation)}
					</View>
			</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	footerBox: {
		position: 'absolute',
		alignItems: 'center',
		bottom: 30,
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		flex: 1,
		height: '100%',
		padding: 10,
	},
	box: {
		display: 'flex',
		margin: 25,
		alignItems: 'center',
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
	},
	categoryCard: {
		width: 240,
		height: 240,
	},
	backgroundImage: {
		display: 'flex',
		width: 220,
		height: 220,
		justifyContent: 'center',
		alignItems: 'center',
	},
	categoryCardText: {
		fontSize: 28,
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
		gap: 10,
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
	themeBox: {
		position: 'absolute',
		right: 0,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	themeIcon: {
		width: 35,
		height: 35,
	},
	containerSwitch: {
		borderRadius: 15,
		width: 65,
		height: 35,
		justifyContent: 'center',
		margin: 30,
	},
	circle: {
		width: 30,
		height: 35,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageBackground: {
		flex: 1,
		width: 30,
		height: 30,
	},
	settingsBox: {
		position: 'absolute',
		top: 10,
		left: 10,
	},
	introBox: {
		display: "flex",
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	}
});

