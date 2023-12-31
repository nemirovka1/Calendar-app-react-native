import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

export const WeatherCard = ({weatherList}) => {
	const image = `https://cdn.weatherbit.io/static/img/icons/${weatherList.weather.icon}.png`;

	return (
		<SafeAreaView style={styles.box}>
			<View style={styles.weatherBox}>
				<View style={styles.weatherContainer}>
					<View style={styles.imageBox}>
						<Image source={{ uri: image }} style={styles.image} />
						<Text style={styles.tempTitle}>{weatherList.temp.toFixed()} °C</Text>
					</View>
				</View>
				<Text style={styles.title}>{weatherList.city_name}</Text>
				<Text style={styles.descWeather}>{weatherList.weather.description}</Text>
				<View style={styles.bottom}>
					<View>
						<Text style={styles.weatherText}>{weatherList.app_temp.toFixed()}</Text>
						<Text style={styles.weatherText}>Feels Like</Text>
					</View>
					<View>
						<Text style={styles.weatherText}>{weatherList?.rh} %</Text>
						<Text style={styles.weatherText}>Humidity</Text>
					</View>
					<View>
						<Text style={styles.weatherText}>{weatherList?.wind_spd.toFixed()} MPH</Text>
						<Text style={styles.weatherText}>Wind Speed</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	box: {
		width: '100%',
		height: '55%',
		display: 'flex',
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 28,
		fontWeight: 600,
	},
	image: {
		width: 100,
		height: 100,
	},
	weatherBox: {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(255,255,255, 0.2)',
		width: '100%',
		height: '100%',
		padding: 10,
		borderRadius: 40,
	},
	weatherContainer: {
		display: 'flex',
		alignItems: "center",
		justifyContent: 'space-between',
		gap: 10,
	},
	bottom: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
        borderRadius: 10,
		padding: 10,
		gap: 10,
		width: '100%',
		backgroundColor: 'rgba(255,255,255, 0.2)',
	},
	weatherText: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 16,
		fontWeight: 500,
	},
	imageBox: {
		color: '#fff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
    tempTitle: {
		color: '#fff',
		fontSize: 28,
		fontWeight: 500,
	},
	descWeather: {
		textAlign: 'right',
		color: '#fff',
		fontSize: 20,
		fontWeight: 400,
	}
});
