import axios from "axios";

export const WEATHER_API_KEY = "3587f0d931c94b5f92515834b3b2b75f"
export const WEATHER_API_URL = "https://api.weatherbit.io/v2.0"
export const getCurrentWeather = async (city) => {
	return axios.get(`${WEATHER_API_URL}/current?city=${city}&key=${WEATHER_API_KEY}`);
};
