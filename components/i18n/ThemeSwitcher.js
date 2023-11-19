import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { darkTheme } from "../theme/theme";
import React, { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

export const ThemeSwitcher = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<View style={styles.themeBox}>
			<TouchableOpacity onPress={toggleTheme} style={[styles.containerSwitch, { backgroundColor: theme === darkTheme  ? '#3b3ead' :'#7d54e8' }]}>
				<View style={[styles.circle, { transform: [{ translateX: theme === darkTheme ? 30 : 5 }] }]}>
					<Text>
						{theme === darkTheme ? (
							<ImageBackground source={require('../assets/moon.png')} style={styles.imageBackground}/>
						): <ImageBackground source={require('../assets/sun-icon.png')} style={styles.imageBackground}/>}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}
const styles = StyleSheet.create({
	themeBox: {
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
