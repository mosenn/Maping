import React, { useState } from 'react';
import { useMapEvent } from 'react-leaflet';

export const LocationMarker = () => {
	const [position, setPosition] = useState(null);
	const map = useMapEvent({
		click() {
			map.locate();
		},
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});
	console.log('postion', position);
	return position === null ? null : (
		<Marker position={position}>
			<Popup>You are here</Popup>
		</Marker>
	);
};
