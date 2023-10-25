import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	notesList: [],
}
const counterSlice = createSlice({
	name: 'counter',
	initialState: initialState,
	reducers: {
		setNotesList: (state, { payload }) => {
			state.notesList = payload
		},
	},
});

export const { setNotesList } = counterSlice.actions;
export const counterReducerName = counterSlice.name
export const counterReducer = counterSlice.reducer
