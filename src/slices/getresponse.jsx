import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import data from './data';

const url = 'https://exam.pishgamanasia.com/webapi/Account/Login';

const initialState = {
	data: [], // i want set response here
	name: 'mohsen',
};

const PostUsers = createSlice({
	name: 'PostingUsers',
	initialState: { value: initialState },
	reducers: {
		SendData: (state, action) => {
			console.log('action payload', action.payload);
			// state.value.data = action.payload;
			// console.log('data', state.value.data);
			// console.log('hi i am function');
			state.value.data = action.payload;
			console.log('data', state.value.data);
		},
	},
});
export default PostUsers.reducer;
export const { SendData } = PostUsers.actions;
