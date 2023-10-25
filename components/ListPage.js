import { Button, StyleSheet, View } from 'react-native';
import Header from "./Header";
import { ListItems } from "./ListItems";

export default function ListPage({navigation}) {
	const handleRedirect = () => {
		navigation.navigate('Main')
	}
	return (
		<View style={styles.container}>
			<Header/>
			<Button title={'Open another page'} onPress={handleRedirect}/>
			<View>
				<ListItems/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	text: {
		fontSize: 20,
		fontWeight: 500,
		color: 'red',
	}
});
