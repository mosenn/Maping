import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Icon } from 'leaflet';

import './style.css';

export default function Mapingtest() {


	return (
		<MapContainer
			center={[50.5, 30.5]}
			zoom={13}
			style={{ height: '100vh' }}
			// whenReady={(map) => {
			//   console.log(map);
			//   map.target.on("click", function (e) {
			//     const { lat, lng } = e.latlng;
			//     L.marker([lat, lng], { Icon }).addTo(map.target);
			//   });
			// }}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{/* {(map) => {
				console.log('map center:', map.getCenter());
				map.on('click', function (e) {
					const { lat, lng } = e.latlng;
					L.marker([lat, lng], { Icon }).addTo(map);
				});
				return null;
			}} */}
		</MapContainer>
	);
}
