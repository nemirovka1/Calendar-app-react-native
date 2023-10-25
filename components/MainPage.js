import { Text, StyleSheet, View, Button } from "react-native";
import WebView from 'react-native-webview';
import { useSelector } from "react-redux";
import { selectNotesList } from "./store/selectors";

export const MainPage = ({navigation}) => {
	const listNotes = useSelector(selectNotesList)

	const openWebView = () => {
		return (
			<WebView source={{ uri: 'https://djinni.co/jobs/my/' }} />
		);
	};
	return (
		<View>
			<Text style={styles.text}>This is First Page</Text>
			{(listNotes || []).map((el) => (
				<View>
					<Text>{el.title}</Text>
					<Text>{el.description}</Text>
				</View>
			))}
			<Button title={'Open Notes'} onPress={()=> navigation.navigate('Home')}/>
			<Button title={'Open Calendar'} onPress={()=> navigation.navigate('Calendar')}/>
			<Button title={ 'Main'} onPress={()=> navigation.navigate('Main')}/>
			<View>
				<Button title="Открыть внутренний браузер" onPress={openWebView} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		padding: 20,
		margin: 20,
	}
});
