import { configureStore } from '@reduxjs/toolkit';
import { counterReducer, counterReducerName } from "./slice";

const store = configureStore({
	reducer: {
		[counterReducerName]: counterReducer
	},
});

export default store;

