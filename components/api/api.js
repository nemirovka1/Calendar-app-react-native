import axios from "axios";

export const WEATHER_API_KEY = "624058298f5a443a937758872011ac68"
export const WEATHER_API_URL = "https://api.weatherbit.io/v2.0"
export const getCurrentWeather = async (city) => {
	return axios.get(`${WEATHER_API_URL}/current?city=${city}&key=${WEATHER_API_KEY}`);
};
