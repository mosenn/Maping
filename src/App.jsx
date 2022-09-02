import './App.css';

import { PhoneFrom } from './Components/PhoneFrom/PhoneFrom';
import { Map } from './Components/Map/Map';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {


	return (
		<div className="App">


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
