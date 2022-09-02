import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const GetingAllData = createSlice({
	name: 'getdata',
	initialState: {
		value: initialState,
	},
	reducers: {
		// func
		GetAlldatafunc: (state, action) => {
			state.value = action.payload;
			console.log(state.value);
		},
	},
});

export default GetingAllData.reducer;
export const { GetAlldatafunc } = GetingAllData.actions;
