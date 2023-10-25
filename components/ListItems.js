import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { FormItem } from "./FormItem";

export const ListItems = () => {
	const [listItemOfText, setListItemOfText] = useState([
		{ text: 'Item1', key: '1' },
		{ text: 'Item2', key: '2' },
		{ text: 'Item3', key: '3' },
	])

	const addNotes = (text) => {
		setListItemOfText((list) => {
			return [ { text, key: Math.random().toString(36).substring(7) }, ...list]
		})
	}

	const deleteNotes = (key) => {
		setListItemOfText((list) => {
			return list.filter((el) => el.key !== key)
		})
	}

	return (
		<View>
			<FormItem addNotes={addNotes}/>
			<FlatList data={listItemOfText} renderItem={({item}) => (
				<TouchableOpacity onPress={() => deleteNotes(item.key)}>
					<Text style={styles.text}>{item.text}</Text>
				</TouchableOpacity>
			)}/>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		padding: 10,
		height: 50,
		backgroundColor: 'silver',
	},
	text: {
		padding: 10,
		fontSize: 18,
		borderRadius: 9,
		textAlign: 'center',
		backgroundColor: 'silver',
		borderWidth: 1,
		marginTop: 8,
		width: '70%',
		marginLeft: '15%',
	}
});
