import MainStack from './components/navigate'
import { Provider } from "react-redux";
import store from "./components/store/store";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
          <Provider store={store}>
               <MainStack />
              <FlashMessage position="top" />
          </Provider>
  );
}
