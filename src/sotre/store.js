import { configureStore } from '@reduxjs/toolkit';

// import file name
import data from '../slices/data';
import PostingData from '../slices/getresponse';
import SearchQueryApi from '../slices/SearchQueryApi';
export const store = configureStore({
	reducer: {
		// name : file
		UserData: data,
		PostingUsers: PostingData,
		SearchQuery: SearchQueryApi,
	},
});
