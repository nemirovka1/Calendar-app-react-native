import { TouchableOpacity, Text, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";

export const FormItem = ({ addNotes }) => {
	const [text, setTextValue] = useState('');

	const onChange = (value) => {
		setTextValue(value);
	};

	const handleAddNotes = () => {
		addNotes(text);
		setTextValue('');
	};

	return (
		<View>
			<TextInput
				value={text}
				style={styles.input}
				onChangeText={onChange}
				placeholder={'Print Notes'}
			/>
			<TouchableOpacity onPress={handleAddNotes} style={styles.addBtn}>
				<Text style={styles.buttonText}>Add Notes</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		borderBottomWidth: 1,
		padding: 10,
		width: '70%',
		marginVertical: 30,
		marginHorizontal: '15%',
	},
	addBtn: {
		width: '70%',
		marginVertical: 10,
		marginHorizontal: '15%',
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 17,
	},
});
