import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowVechiles } from '../../slices/SearchQueryApi';

export const Map = () => {
	const state = useSelector((state) => state);
	const [TakeMassage, setTakeMassage] = useState();
	const [getNameVechiles, setGetNameVechiles] = useState([]);
	const data = state.PostingUsers.value.data;
	let userToken = '92d15c07';
	// let userToken;
	if (data.length !== 0) {
		// userToken = state.PostingUsers.value.data.data.userToken;
	}
	console.log('here', getNameVechiles);
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

			{/* <button
				onClick={() => {
					dispatch(ShowVechiles());
				}}
			>
				click
			</button> */}
		</section>
	);
};
