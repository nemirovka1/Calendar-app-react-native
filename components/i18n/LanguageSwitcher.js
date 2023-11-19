import { useLanguage } from './LanguageContext';
import i18n from './i18n';
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useContext, useState } from "react";
import { ThemeContext } from "../theme/ThemeContext";

export const LanguageSwitcher = () => {
	const { selectedLanguage, changeLanguage } = useLanguage();
	const [isFocus, setIsFocus] = useState(false);
	const { theme } = useContext(ThemeContext);


	const data = [
		{label: 'English', value: 'en'},
		{label: 'Spanish', value: 'es'},
		{label: 'Ukraine', value: 'ua'}
	]
	const changeAppLanguage = (e) => {
		const nextLanguage = e.value
		changeLanguage(nextLanguage);
		i18n.changeLanguage(nextLanguage)
		setIsFocus(true)
	};
	const activeLanguage = data.find((el) => el.value === selectedLanguage).label

	return (
		<View>
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? activeLanguage : 'Language'}
				searchPlaceholder="Search..."
				value={activeLanguage}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={changeAppLanguage}
				containerStyle={{
					borderRadius: 8,
					backgroundColor: '#7d54e8',
				}}
			/>
		</View>

	);
};
const styles = StyleSheet.create({
	dropdown: {
		width: 120,
		height: 40,
		backgroundColor: '#7d54e8',
		borderRadius: 8,
		paddingHorizontal: 8,
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
});
