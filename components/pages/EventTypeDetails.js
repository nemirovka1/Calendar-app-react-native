import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useContext} from "react";
import { useSelector } from "react-redux";
import { selectNotesList } from "../store/selectors";
import Icon from "react-native-vector-icons/FontAwesome";
import { ThemeContext } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { NotesList } from "../helpers/NotesList";


export const EventTypeDetails = ({ navigation }) => {
	const route = useRoute();
	const { label } = route.params
	const listNotes = useSelector(selectNotesList)
	const filterListNotes = listNotes.filter((el) => el.eventType === label.toLowerCase())
	const { theme } = useContext(ThemeContext);
	const { t } = useTranslation()

	const totalEvents = listNotes.length
	const eventCounts = {};
	listNotes.forEach((note) => {
		const eventType = note.eventType;
		if (eventCounts[eventType]) {
			eventCounts[eventType]++;
		} else {
			eventCounts[eventType] = 1;
		}
	});

	const eventPercentage = {};
	for (const type in eventCounts) {
		const count = eventCounts[type];
		eventPercentage[type] = Math.floor((count / totalEvents) * 100);
	}

	const data = [
		{
			key: 1,
			title: t('University'),
			value: eventPercentage["private"] || 0,
			svg: { fill: '#6129a9' },
		},
		{
			key: 2,
			title: t("Home"),
			value: eventPercentage["home"] || 0,
			svg: { fill: '#55d3a6' },

		},
		{
			key: 3,
			title: t("Work"),
			value: eventPercentage["work"] || 0,
			svg: { fill: '#d74444' },
		},
	];


	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
			<View style={styles.box}>
				<Text style={[styles.title, { color: theme.textColor }]}>{label}</Text>
				<View style={styles.filterContainer}>
					<Text style={[styles.filterText, { color: theme.textColor }]}>{t('Tasks')}</Text>
					<TextInput
						style={styles.filterInput}
						placeholder={ t("Type Task")}
					/>
					<Icon name="search" size={18} style={{ position: 'absolute', right: 30, top: 10 }} />
				</View>
				<View style={styles.notesContainer}>
					<NotesList listNotes={filterListNotes}/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: 'center',
	},
	box: {
		display: "flex",
		alignItems: 'center',
		margin: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
	},
	notesContainer: {
		width: '100%',
		height: '100%',
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
})
