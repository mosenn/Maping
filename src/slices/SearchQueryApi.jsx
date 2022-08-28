import { createSlice } from '@reduxjs/toolkit';

let dataVechilesh;



const initialState = {
	datavechilesh: dataVechilesh,
};

const SearchQuerySlice = createSlice({
	name: 'SearchQuery',
	initialState: {
		value: initialState,
	},
	reducers: {
		// func
		ShowVechiles: (state) => {
			console.log(state.value.datavechilesh);
		},
	},
});

export default SearchQuerySlice.reducer;
export const { ShowVechiles } = SearchQuerySlice.actions;
