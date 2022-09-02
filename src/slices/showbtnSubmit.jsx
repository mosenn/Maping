import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	showbtn: true,
};

const DataSlice = createSlice({
	name: 'showingbtn',
	initialState: {
		value: initialState,
	},
	reducers: {
		// functions
		log: (state) => {
			state.value.showbtn = !state.value.showbtn;
			console.log(state, 'hahahahahahahah');
		},
	},
});

export default DataSlice.reducer;
export const { log } = DataSlice.actions;
