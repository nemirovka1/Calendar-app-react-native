import { Text, StyleSheet, View, Button } from "react-native";
import WebView from 'react-native-webview';

export const MainPage = ({navigation}) => {
	const openWebView = () => {
		console.log(1)
		return (
			<WebView source={{ uri: 'https://djinni.co/jobs/my/' }} />
		);
	};
	return (
		<View>
			<Text style={styles.text}>This is First Page</Text>
			<Button title={'Open Notes'} onPress={()=> navigation.navigate('Home')}/>
			<Button title={'Open Weather'} onPress={()=> navigation.navigate('Weather')}/>
			<Button title={'Open Calendar'} onPress={()=> navigation.navigate('Calendar')}/>
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
