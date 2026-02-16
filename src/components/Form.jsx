// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCities } from '../contexts/CitiesContext';
import { useUrlPosition } from '../hooks/useUrlPosition';

import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';

import Button from './Button';
import ButtonBack from './ButtonBack';
import Spinner from './Spinner';
import Message from './Message';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
const initialState = {
	cityName: '',
	country: '',
	countryCode: '',
	date: new Date(),
	notes: '',
	isLoading: false,
	errorMessage: '',
};

function reducer(state, action) {
	switch (action.type) {
		case 'setCityName':
			return {
				...state,
				cityName: action.payload,
			};
		case 'setDate':
			return {
				...state,
				date: action.payload,
			};
		case 'setNotes':
			return {
				...state,
				notes: action.payload,
			};
		case 'setIsLoading':
			return {
				...state,
				isLoading: action.payload,
			};
		case 'selectCity':
			return {
				...state,
				cityName: action.payload.city,
				country: action.payload.countryName,
				countryCode: action.payload.countryCode.toLowerCase(),
				date: new Date(),
			};
		case 'setError':
			return {
				...state,
				errorMessage: action.payload,
			};

		default:
			throw new Error('Action Unknown!');
	}
}

function Form() {
	const [
		{
			cityName,
			country,
			countryCode,
			date,
			notes,
			isLoading,
			errorMessage,
		},
		dispatch,
	] = useReducer(reducer, initialState);
	const navigate = useNavigate();

	const { lat, lng } = useUrlPosition();
	const { createCity, isLoading: isFormLoading } = useCities();

	async function handleSubmit(e) {
		e.preventDefault();

		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			countryCode,
			date,
			notes,
			position: { lat: Number(lat), lng: Number(lng) },
		};

		await createCity(newCity);
		navigate('/app/cities');
	}

	useEffect(
		function () {
			if (!lat && !lng) return;
			async function fetchCityData() {
				dispatch({ type: 'setIsLoading', payload: true });
				dispatch({ type: 'setError', payload: '' });
				try {
					const res = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`,
					);
					if (!res.ok) throw new Error('Failed to Fetch!');
					const data = await res.json();
					if (!data.city)
						throw new Error(
							'City NOT Found! Please click somewhere else! 😕',
						);
					dispatch({ type: 'selectCity', payload: data });
				} catch (err) {
					dispatch({ type: 'setError', payload: err.message });
				} finally {
					dispatch({ type: 'setIsLoading', payload: false });
				}
			}
			fetchCityData();
		},
		[lat, lng],
	);

	if (!lat && !lng)
		return (
			<Message message={'Start adding city by clicking on the map! 🙃'} />
		);
	if (isLoading) return <Spinner />;
	if (errorMessage) return <Message message={errorMessage} />;

	return (
		<form
			className={`${styles.form} ${isFormLoading ? styles.loading : ''}`}
			onSubmit={handleSubmit}
		>
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
				<DatePicker
					id="date"
					selected={date}
					onChange={date =>
						dispatch({ type: 'setDate', payload: date })
					}
					dateFormat={'yyyy/MM/dd'}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">
					Notes about your trip to {cityName}
				</label>
				<textarea
					id="notes"
					onChange={e =>
						dispatch({ type: 'setNotes', payload: e.target.value })
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
