import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { log } from './slices/data';
import { PhoneFrom } from './Components/PhoneFrom/PhoneFrom';
import { Map } from './Components/Map/Map';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
	const state = useSelector((state) => state.value);
	const dispatch = useDispatch();

	return (
		<div className="App">
			<button
				onClick={() => {
					dispatch(log());
				}}
			>
				Log Function Action
			</button>

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<PhoneFrom></PhoneFrom>}></Route>
					<Route path="/map" element={<Map />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
