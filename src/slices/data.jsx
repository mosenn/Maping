import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const DataSlice = createSlice({
	name: 'UserData',
	initialState: {
		value: initialState,
	},
	reducers: {
		// functions
		log: () => {
			console.log('i am working');
		},
	},
});

export default DataSlice.reducer;
export const {log} = DataSlice.actions