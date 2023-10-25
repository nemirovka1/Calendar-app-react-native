import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { MainPage } from "./pages/MainPage";
import ListPage from "./ListPage";
import CalendarPage from "./CalendarPage";
import { EventTypeDetails } from "./pages/EventTypeDetails";

const Stack = createNativeStackNavigator();

export default function Navigate () {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{/*<Stack.Screen name="Main" component={MainPage} />*/}
				<Stack.Screen name="Home" component={ListPage} />
				<Stack.Screen name="Calendar" component={CalendarPage}/>
				<Stack.Screen name="Main" component={MainPage}/>
				<Stack.Screen name="DetailsEvent" component={EventTypeDetails}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
