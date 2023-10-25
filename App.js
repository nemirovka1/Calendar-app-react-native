import MainStack from './components/navigate'
import { Provider } from "react-redux";
import store from "./components/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
          <Provider store={store}>
                  <MainStack />
          </Provider>
  );
}
