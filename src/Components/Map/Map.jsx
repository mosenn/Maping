import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './style.css';
import { MapComponent } from '../MapComponent/MapComponent';

export const Map = () => {
	//------------------------------------------------ ALL STATE THIS COMPONTENT
	const serchinpt = useRef();
	// console.log('lat and lng', lg, lt);
	const state = useSelector((state) => state);
	const [TakeMassage, setTakeMassage] = useState();
	const [getNameVechiles, setGetNameVechiles] = useState([]);
	const [query, setQuery] = useState();
	const [validate, setValidate] = useState('');
	const [showMessage, setShowMessage] = useState(false);
	// coming data from slices
	const data = state.PostingUsers.value.data;
	const get_Lat_Lng = state.getdata;
	const { lat, print, lng, showbtn } = get_Lat_Lng.value;
	// console.log(lat, lng, print, 'showbtn :', showbtn);

	const ShowingSubmitBtn = useSelector(
		(state) => state.showingbtn.value.showbtn
	);
	//
	let userToken = '92d15c07';
	// let userToken;
	if (data.length !== 0) {
		// userToken = state.PostingUsers.value.data.data.userToken;
	}
	// console.log('here', getNameVechiles);

	// posting user data
	const urlUserDAtaPost =
		'https://exam.pishgamanasia.com/webapi/Request/SendRequest';

	const postinguserDAta = async (lat, lng, id) => {
		console.log('data lt lg in function', lat, lng);

		try {
			const resp = await axios.post(urlUserDAtaPost, {
				userToken: userToken,
				vehicleUserTypeId: id,
				source: JSON.stringify(lat),
				destination: JSON.stringify(lng),
			});
			console.log('postinDAta', resp);
		} catch (error) {
			console.log(error);
		}
	};

	const SearchQuery = async (e) => {
		let valid;
		if (/^\s/.test(e.target.value)) {
			e.target.value = '';
			valid = 'لطفا بدون فاصله تایپ کنید';
		} else if (/[0-9]/.test(e.target.value)) {
			e.target.value = '';
			valid = 'عدد وارد نکنید';
		} else if (e.target.value.match(/^[A-Za-z]+$/)) {
			e.target.value = '';
			valid = 'کیبورد خود را فارسی کنید';
		} else if (e.target.value.length <= 2) {
			valid = 'مقدار وارد شده باید بیشتر از 2 حرف باشید ';
		}
		const queryValue = e.target.value;
		setQuery(queryValue);
		setValidate(valid);
	};

	const HandelerSubmit = async (e) => {
		e.preventDefault();
		if (userToken && !serchinpt.current.value == '') {
			setShowMessage(true);
			const resp = await fetch(
				`https://exam.pishgamanasia.com/webapi/Request/GetVehicleUsers?UserToken=${userToken}&SearchTerm=${query}`
			);

			const getData = await resp.json();
			setGetNameVechiles(getNameVechiles.concat(getData.data));

			const { message, status, data } = getData;
			// console.log('result', message, data, status);
			setTakeMassage({
				Status: status,
				VhData: getData.data,
			});

			if (data.length !== 0) {
				setTakeMassage({
					Message: message,
				});
				console.log('in the if', TakeMassage.Message);
			}
		}
	};

	const HandalerSubmitLatLng = (e) => {
		e.preventDefault();
		postinguserDAta(lat, lng, TakeMassage.VhData[0].id);
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

	// contorl dublicate map
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
					ref={serchinpt}
				/>

				<button type="submit">Submit</button>
			</form>
			{/* validate div */}
			<div>
				<h4>{validate}</h4>
			</div>

			{/* succese massage */}
			{TakeMassage && (
				<section>
					<div>{TakeMassage.Message}</div>
				</section>
			)}
			{/* name vechiles maping */}
			{getNameVechiles &&
				// [...new Set(array)]

				uniqueVHichels.map((items) => {
					const { name, id } = items;

					return (
						<section key={id}>
							<div>
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
	
			{/* map and butn submit and lat , lang parent show */}
			{getNameVechiles.length !== 0 ? (
				<section>
					<form action="" onSubmit={HandalerSubmitLatLng}>
						<button
							type="submit"
							disabled={ShowingSubmitBtn}
							// disabled={true}
						>
							{ShowingSubmitBtn
								? 'مبدا و مقصد را مشخص کنید'
								: 'برای ثبت مسیر کلیک کنید'}
						</button>
					</form>
					{print && (
						<div>
							<div>
								<span>مبدا</span>
								<span style={{ padding: '2px', margin: '5px' }}>
									{print[0]}
								</span>

								<span style={{ padding: '2px', margin: '5px' }}>
									{print[1]}
								</span>
							</div>
							<div>
								<span>مقصد</span>
								<span style={{ padding: '2px', margin: '5px' }}>
									{print[2]}
								</span>
								<span style={{ padding: '2px', margin: '5px' }}>
									{print[3]}
								</span>
							</div>
						</div>
					)}

					<MapComponent
						getNameVechiles={getNameVechiles}
					></MapComponent>
				</section>
			) : (
				<div>
					<h1>لطفا یک سروی سرچ و انتخاب کنید</h1>
				</div>
			)}
		</section>
	);
};
