import { counterReducerName } from "./slice";

export const selectNotesList = (state) => state[counterReducerName].notesList
