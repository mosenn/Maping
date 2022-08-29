import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowVechiles } from '../../slices/SearchQueryApi';
import { Icon } from 'leaflet';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './style.css';
import Mapingtest from '../test/test';

export const Map = () => {
	const [lt, setLat] = useState();
	console.log('lt', lt);

	const state = useSelector((state) => state);
	const [TakeMassage, setTakeMassage] = useState();
	const [getNameVechiles, setGetNameVechiles] = useState([]);
	const data = state.PostingUsers.value.data;
	let userToken = '92d15c07';
	// let userToken;
	if (data.length !== 0) {
		// userToken = state.PostingUsers.value.data.data.userToken;
	}
	// console.log('here', getNameVechiles);
	const dispatch = useDispatch();
	const [query, setQuery] = useState();

	const SearchQuery = async (e) => {
		const queryValue = e.target.value;
		setQuery(queryValue);
	};
	const HandelerSubmit = async (e) => {
		e.preventDefault();
		if (userToken) {
			const resp = await fetch(
				`https://exam.pishgamanasia.com/webapi/Request/GetVehicleUsers?UserToken=${userToken}&SearchTerm=${query}`
			);

			const getData = await resp.json();
			setGetNameVechiles(getNameVechiles.concat(getData.data));

			const { message, status } = getData;
			// console.log('result', message, data, status);
			setTakeMassage({
				Message: message,
				Status: status,
			});
		} else {
			setTakeMassage({
				Message: 'برای جستجو نیاز به یک کد دارید',
			});
		}
	};

	//

	// Draggable Function Marker map

	// daraging marker
	const center = {
		lat: 51.505,
		lng: -0.09,
	};
	const [draggable, setDraggable] = useState(false);
	const [position, setPosition] = useState(center);
	const markerRef = useRef(null);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
					// console.log(marker.getLatLng());
				}
			},
		}),
		[]
	);
	const toggleDraggable = useCallback(() => {
		setDraggable((d) => !d);
	}, []);

	//change icons marker

	const MarkerIcons = new Icon({
		iconUrl: '/public/marker1.png',
		iconSize: [25, 25],
	});
	let markerlength = 0;
	return (
		<section>
			<h1>Maping</h1>
			<form action="" onSubmit={HandelerSubmit}>
				<input
					type="search"
					name="search"
					id=""
					placeholder="سرویس خود را سرچ کنید"
					onChange={SearchQuery}
				/>

				<button type="submit">Submit</button>
			</form>
			{TakeMassage && (
				<section>
					<div>{TakeMassage.Message}</div>
					<div>{TakeMassage.Status}</div>
				</section>
			)}
			{getNameVechiles &&
				getNameVechiles.map((items) => {
					console.log(items);
					const { name, id } = items;
					return (
						<section>
							<div key={id}>
								<h3>{name}</h3>
								<input type="checkbox" />
								<label htmlFor="">
									مایل هستید با این وسیله نقلیه جابه جای شید
								</label>
							</div>
						</section>
					);
				})}

			{/*---------------------------------------------------------- map */}

			<MapContainer
				whenReady={(map) => {
					// console.log(map);
					map.target.on('click', function (e) {
						const { lat, lng } = e.latlng;
						markerlength++;
						// console.log('latlang', lat, lng);
						if (markerlength <= 2) {
							L.marker([lat, lng], {
								draggable: true,
								autoPan: false,
							}).addTo(map.target);
							setLat(lat); // in bayd post konam data
						}

						console.log(markerlength, 'markerlength');
					});
				}}
				center={{ lat: 29.591768, lng: 52.583698 }}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://map.pishgamanasia.ir">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<Marker
					icon={MarkerIcons}
					// position={([29.591768, 52.583698], [29.59179, 52.58365])}
					position={[29.585924456479244, 52.583698]}
					draggable={draggable}
					eventHandlers={eventHandlers}
					ref={markerRef}
				>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
						<span
							onClick={toggleDraggable}
							style={{
								color: 'red',
							}}
						>
							{draggable
								? 'Marker is draggable'
								: 'Click here to make marker draggable'}
						</span>
					</Popup>
				</Marker>
			</MapContainer>

			{/* 
			<Mapingtest></Mapingtest> */}
		</section>
	);
};
