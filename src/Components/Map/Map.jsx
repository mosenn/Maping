import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import './style.css';

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
	const [conditionCheckbox, setConditionCheckbox] = useState();
	const [Radio, Setradio] = useState();
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
		// console.log('id_VH', TakeMassage.VhData[0].id);
		postinguserDAta(lt, lg, TakeMassage.VhData[0].id);
	};

	//----------------------------------------------------------- Draggable Function Marker map

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

	//
	const CheckBoxHandeler = (e) => {
		console.log('checkbox', e.target.checked);
		let checkboxValue = e.target.checked;
		setConditionCheckbox(e.target.checked);
		if (conditionCheckbox === true) {
			console.log('trueeee');
		}
	};
	const CloseVchiles = (id) => {
		if (getNameVechiles) {
			let deletingVchiles = getNameVechiles.filter(
				(data) => data.id !== id
			);
			setGetNameVechiles(deletingVchiles);

			// console.log('id in function ', id);
			// console.log('data in function close', getNameVechiles[0].id);
		}
		window.location.reload();
	};

	const uniqueIdsVh = [];

	const uniqueVHichels = getNameVechiles.filter((element) => {
		const VhisDuplicate = uniqueIdsVh.includes(element.id);

		if (!VhisDuplicate) {
			uniqueIdsVh.push(element.id);

			return true;
		}

		return false;
	});

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
				// [...new Set(array)]

				uniqueVHichels.map((items) => {
					const { name, id } = items;

					return (
						<section>
							<div key={id}>
								<h3>{name}</h3>

								<button
									onClick={() => {
										CloseVchiles(id);
									}}
								>
									Close
								</button>
							</div>
						</section>
					);

					// console.log(items);
					// [...new Set(getNameVechiles)];
				})}

			{/*---------------------------------------------------------- Map */}
			{/* submit lat and lng  */}

			{getNameVechiles.length !== 0 ? (
				<section>
					<form action="" onSubmit={HandalerSubmitLatLng}>
						<button
							type="submit"
							disabled={showSubmitbtnData}
							// disabled={true}
						>
							ثبت مبدا و مقصد
						</button>
					</form>
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
									setShowSubmitbtnData(!showSubmitbtnData);
								}

								if (
									markerlength <= 2 &&
									getNameVechiles.length !== 0
								) {
									L.marker([lat, lng], {
										draggable: [
											console.log([lat, lng], true),
										],
										autoPan: false,
										icon:
											markerlength === 1
												? Dimoned
												: MArker2,
									}).addTo(map.target);
									setLat(lat); // in bayd post konam data
									setLng(lng);
								}
								L.marker;

								console.log(markerlength, 'markerlength');
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
				</section>
			) : (
				<div>
					<h1>لطفا یک سروی سرچ و انتخاب کنید</h1>
				</div>
			)}
		</section>
	);
};
