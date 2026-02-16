// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from 'react';

import { useUrlPosition } from '../hooks/useUrlPosition';

import styles from './Form.module.css';

import Button from './Button';
import ButtonBack from './ButtonBack';
import Spinner from './Spinner';
import Message from './Message';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
const initialState = {
	isCityLoading: false,
	errorMessage: '',
	cityName: '',
	countryCode: '',
	date: new Date(),
	notes: '',
};

function reducer({ state, action }) {
	return initialState;
}

function Form() {
	const [
		{ cityName, countryCode, date, notes, isCityLoading, errorMessage },
		dispatch,
	] = useReducer(reducer, initialState);
	const { lat, lng } = useUrlPosition();

	useEffect(
		function () {
			async function fetchCityData() {
				dispatch({ type: 'startLoading' });
				try {
					const res = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`,
					);
					if (!res.ok) throw new Error('Failed to Fetch!');
					const data = await res.json();
					console.log(data);
				} catch (err) {
					dispatch({ type: 'fetchError' });
				} finally {
					dispatch({ type: 'endLoading' });
				}
			}
			fetchCityData();
		},
		[lat, lng],
	);

	if (isCityLoading) return <Spinner />;
	if (errorMessage) return <Message message={errorMessage} />;

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={e =>
						dispatch({
							type: 'setCityName',
							payload: e.target.value,
						})
					}
					value={cityName}
				/>
				<span className={styles.flag}>
					<span className={`fi fi-${countryCode}`}></span>
				</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<input
					id="date"
					onChange={e =>
						dispatch({ type: 'setDate', payload: e.target.value })
					}
					value={date}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">
					Notes about your trip to {cityName}
				</label>
				<textarea
					id="notes"
					onChange={e =>
						dispatch({ type: 'setNote', payload: e.target.value })
					}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<ButtonBack />
			</div>
		</form>
	);
}

export default Form;
