import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowVechiles } from '../../slices/SearchQueryApi';
import axios from 'axios';
import { Icon } from 'leaflet';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './style.css';
import MapWrapper from '../test/test';

export const Map = () => {
	//------------------------------------------------ ALL STATE THIS COMPONTENT
	const [lt, setLat] = useState();
	// console.log('lt', lt);
	const [lg, setLng] = useState();
	const [showSubmitbtnData, setShowSubmitbtnData] = useState(true);
	console.log('lat and lng', lg, lt);
	const state = useSelector((state) => state);
	const [TakeMassage, setTakeMassage] = useState();
	const [getNameVechiles, setGetNameVechiles] = useState([]);
	const [takeIDVechiles, setTAkeIDVechiles] = useState();
	const data = state.PostingUsers.value.data;

	//
	let userToken = '92d15c07';
	// let userToken;
	if (data.length !== 0) {
		// userToken = state.PostingUsers.value.data.data.userToken;
	}
	// console.log('here', getNameVechiles);
	const dispatch = useDispatch();

	// posting user data
	const urlUserDAtaPost =
		'https://exam.pishgamanasia.com/webapi/Request/SendRequest';

	const postinguserDAta = async (lt, lg, id) => {
		console.log('data lt lg in function', lt, lg);

		try {
			const resp = await axios.post(urlUserDAtaPost, {
				userToken: userToken,
				vehicleUserTypeId: id,
				source: JSON.stringify(lt),
				destination: JSON.stringify(lg),
			});
			console.log('postinDAta', resp);
		} catch (error) {
			console.log(error);
		}
	};

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
				VhData: getData.data,
			});
		} else {
			setTakeMassage({
				Message: 'برای جستجو نیاز به یک کد دارید',
			});
		}
	};

	//
	const HandalerSubmitLatLng = (e) => {
		e.preventDefault();
		console.log('id_VH', TakeMassage.VhData[0].id);
		postinguserDAta(lt, lg, TakeMassage.VhData[0].id);
	};

	//----------------------------------------------------------- Draggable Function Marker map

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

	//
	let Dimoned = L.icon({
		iconUrl: '/public/marker1.png',
		iconSize: [50, 50], // size of the icon
	});
	let MArker2 = L.icon({
		iconUrl: '/public/marker2.png',
		iconSize: [50, 50], // size of the icon
	});

	//

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
					// console.log(items);
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

			{/*---------------------------------------------------------- Map */}

			<form action="" onSubmit={HandalerSubmitLatLng}>
				<button
					type="submit"
					disabled={showSubmitbtnData}
					// disabled={true}
				>
					ثبت مبدا و مقصد
				</button>
			</form>
			<button type=""></button>
			<MapContainer
				whenReady={(map) => {
					// console.log(map);
					map.target.on('click', function (e) {
						const { lat, lng } = e.latlng;
						markerlength++;
						// console.log('latlang', lat, lng);
						if (markerlength === 2) {
							setShowSubmitbtnData(!showSubmitbtnData);
						}
						if (markerlength <= 2) {
							L.marker([lat, lng], {
								draggable: [console.log([lat, lng], true)],
								autoPan: false,
								icon: markerlength === 1 ? Dimoned : MArker2,
							}).addTo(map.target);
							setLat(lat); // in bayd post konam data
							setLng(lng);
						}
						L.marker;

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

				<Marker
					position={[29.585924456479244, 52.583698]}
					eventHandlers={{
						click: (e) => {
							console.log('marker clicked', e);
						},
					}}
				/>
			</MapContainer>

			{/* <MapWrapper></MapWrapper> */}
		</section>
	);
};
