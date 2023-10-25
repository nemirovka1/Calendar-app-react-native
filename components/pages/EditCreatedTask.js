import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectNotesList } from "../store/selectors";


export const EditCreatedTask = ({navigation}) => {
	const route = useRoute();
	const { id } = route.params
	const listNotes = useSelector(selectNotesList)
	const filterListNotes = listNotes.filter((el) => el.id === id)

	console.log({filterListNotes})
	return (
		<View>
			<Text> Edit</Text>
		</View>
	)
}
