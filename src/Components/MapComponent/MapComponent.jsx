import React, { useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { GetAlldatafunc } from '../../slices/GetData';
import { log } from '../../slices/showbtnSubmit';

export const MapComponent = (getNameVechiles) => {
	const dispatch = useDispatch();
	const [lt, setLat] = useState();
	// console.log('lt', lt);
	const [lg, setLng] = useState();
	const [printlatlng, setPrintlatlng] = useState([]);
	// console.log(printlatlng, 'printlatlang');

	const [showSubmitbtnData, setShowSubmitbtnData] = useState(false);

	const showbtn = useSelector((state) => state.showingbtn.value.showbtn);
	console.log(showbtn, 'i am here');

	//
	let markerlength = 0;
	let Dimoned = L.icon({
		iconUrl: '/public/marker1.png',
		iconSize: [50, 50], // size of the icon
	});
	let MArker2 = L.icon({
		iconUrl: '/public/marker2.png',
		iconSize: [50, 50], // size of the icon
	});

	return (
		<div>
			<MapContainer
				whenReady={(map) => {
					map.target.on('click', function (e) {
						const { lat, lng } = e.latlng;

						markerlength++;
						// console.log('latlang', lat, lng);
						if (
							markerlength === 2 &&
							getNameVechiles.length !== 0
						) {
							console.log('now marker length is 2 ');
							dispatch(log());
							console.log(showbtn, 'after marker condition');
						}
						if (markerlength <= 2 && getNameVechiles.length !== 0) {
							L.marker([lat, lng], {
								// draggable:'',
								autoPan: false,
								icon: markerlength === 1 ? Dimoned : MArker2,
							}).addTo(map.target);

							setLat(lat); // in bayd post konam data
							setLng(lng);
							printlatlng.push(lat, lng);
							dispatch(
								GetAlldatafunc({
									lat: lat,
									lng: lng,
									print: [...printlatlng],
									showbtn: showSubmitbtnData,
								})
							);
						}
						L.marker;

						// console.log(markerlength, 'markerlength');
					});

					// console.log(map);
				}}
				center={{ lat: 29.591768, lng: 52.583698 }}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://map.pishgamanasia.ir">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</div>
	);
};
