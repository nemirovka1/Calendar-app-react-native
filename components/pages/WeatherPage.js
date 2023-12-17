import React, { useContext, useEffect, useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, ImageBackground,Text, View } from "react-native";
import { footerComponent } from "../helpers/helpers";
import { getCurrentWeather } from "../api/api";
import { WeatherCard } from "./WeatherCard";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../theme/ThemeContext";
import { ErrorData } from "../error/ErrorModal";

export const WeatherPage = ({ navigation }) => {
	const [city, setCity] = useState('Albacete');
	const [weatherList, setWeatherList] = useState();
	const { t } = useTranslation()
	const { theme, toggleTheme } = useContext(ThemeContext);
	const [isErrorModalVisible, setErrorModalVisible] = useState(false);

	const fetchData = async () => {
		try {
			const result = await getCurrentWeather(city);
			setWeatherList(result.data.data[0]);
			console.log({result})
		} catch (error) {
			setErrorModalVisible(true);
		}
	};
	const closeModal = () => {
		setErrorModalVisible(false);
	};
	const handleBlur = () => {
		fetchData();
	};

	useEffect(() => {
		fetchData();
	}, []);

	const renderWeather = useMemo(() => {
		if (!weatherList) return null;
		return <WeatherCard weatherList={weatherList} />;
	}, [weatherList]);

	return (
		<SafeAreaView style={[styles.box, { backgroundColor: theme.backgroundColor }]}>
			<ErrorData isOpen={isErrorModalVisible} onClose={closeModal} text={'Something went wrong!'}/>
			<View style={styles.box}>
				<ImageBackground
					style={styles.backgroundImg}
					source={require('../assets/CalendarBacground.png')}
				>
					<Text style={styles.title}>{t('Weather')}</Text>
					<TextInput
						value={city}
						style={styles.input}
						onChangeText={setCity}
						placeholderTextColor="#fff"
						placeholder={ t( "Search city" ) }
						onBlur={handleBlur}
					/>
					<View style={styles.weatherBox}>{renderWeather}</View>
				</ImageBackground>
				{footerComponent(navigation)}
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	box: {
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		marginTop: 5,
		padding: 10,
		fontSize: 18,
		width: '80%',
		borderRadius: 10,
		backgroundColor: '#8a76d9',
		color: '#fff',
	},
	backgroundImg: {
		display: 'flex',
		width: '100%',
		height: '95%',
		alignItems: 'center',
	},
	title: {
		color: '#fff',
		marginTop: 20,
		fontSize: 38,
		fontWeight: 600,
	},
	weatherBox: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 50,
		width: '90%',
		height: '100%',
	}
});
