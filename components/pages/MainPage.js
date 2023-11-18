import {  useSelector } from "react-redux";
import { selectNotesList } from "../store/selectors";
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	ImageBackground,
	TextInput,
	Button,
	TouchableOpacity
} from "react-native";
import { footerComponent, formatDate, getCurrentDay, renderListNotes } from "../helpers/helpers";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useContext, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../i18n/LanguageSwitcher";
import { ThemeContext } from "../theme/ThemeContext";

export const MainPage = ({navigation}) => {
	const listNotes = useSelector(selectNotesList)
	const [searchText, setSearchText] = useState("")
	const [activeSlide, setActiveSlide] = useState(0)
	const { t } = useTranslation()
	const { theme, toggleTheme } = useContext(ThemeContext);


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

	const filteredNotes = sortedNotesList.filter(note =>
		(note?.title?.toLowerCase()).includes(searchText.toLowerCase()))


	return (
			<SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
				<Button title="Сменить тему" onPress={toggleTheme} />
				<LanguageSwitcher/>
				<View  style={styles.box}>
					<View>
						<Text style={[styles.titleText, { color: theme.textColor }]}>{t("Main Title")}</Text>
						<Text style={[styles.dayTitle, { color: theme.textColor }]}>{formatDate(getCurrentDay())}</Text>
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
							sliderWidth={300}
							itemWidth={260}
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
						<Icon name="search" size={18} style={{ position: 'absolute', right: 20, top: 5 }} />
					</View>
					{renderListNotes(filteredNotes, navigation)}
				</View>
				{footerComponent(navigation)}
			</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		flex: 1,
		height: '90%',
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
});

