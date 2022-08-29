const url = 'https://exam.pishgamanasia.com/webapi/Account/Login';

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { SendData } from '../../slices/getresponse';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export const PhoneFrom = () => {
	let InpPhoneValue = useRef();
	const [apiData, SetData] = useState();
	const [takeValues, SetTakeValues] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const TakeValue = (e) => {
		SetTakeValues({
			...takeValues,
			[e.target.name]: e.target.value,
		});
	};

	const SubmitFunction = async (e) => {
		e.preventDefault();

		try {
			const resp = await axios.post(url, {
				username: takeValues.username,
				password: takeValues.password,
			});
			console.log(resp);
			SetData(resp);

			dispatch(SendData(resp.data)); // send user token and other !

			if (resp.data.data.userToken !== null) {
				setInterval(() => {
					navigate('/map');
				}, 3000);
			}
		} catch (error) {
			console.log(error);
		}
	};


	return (
		<div>
			<form action="" method="post" onSubmit={SubmitFunction}>
				<input
					onChange={TakeValue}
					type="text"
					name="username"
					id=""
					placeholder="شماره موبایل خود را وارد کنید"
					ref={InpPhoneValue}
				/>
				<input type="text" id="" name="password" onChange={TakeValue} />

				<label htmlFor="">شماره تلفن من را به خاطر بسپار</label>
				<button type="submit">submit</button>

				<div> {apiData && apiData.data.message}</div>
			</form>
		</div>
	);
};
