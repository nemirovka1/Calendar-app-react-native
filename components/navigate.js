import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { MainPage } from "./pages/MainPage";
import CalendarPage from "./CalendarPage";
import { EventTypeDetails } from "./pages/EventTypeDetails";
import { WeatherPage } from "./pages/WeatherPage";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";

const Stack = createNativeStackNavigator();

export default function Navigate () {
	return (
		<NavigationContainer>
			<ThemeProvider>
				<LanguageProvider>
						<Stack.Navigator>
							<Stack.Screen name="Main" component={MainPage}/>
							<Stack.Screen name="Calendar" component={CalendarPage}/>
							<Stack.Screen name="DetailsEvent" component={EventTypeDetails}/>
							<Stack.Screen name="Weather" component={WeatherPage}/>
						</Stack.Navigator>
				</LanguageProvider>
			</ThemeProvider>
		</NavigationContainer>
	)
}
