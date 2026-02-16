import { createContext, useEffect, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:8000';

CitiesProvider.propTypes = {
	children: PropTypes.element,
};

const initialState = {
	cities: [],
	currentCity: {},
	isLoading: false,
	error: '',
};
function reducer(state, action) {
	switch (action.type) {
		case 'loading':
			return {
				...state,
				isLoading: true,
			};
		case 'cities/loaded':
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case 'city/loaded':
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
			};
		case 'city/created':
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
				cities: [...state.cities, action.payload],
			};
		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				currentCity:
					state.currentCity.id !== action.payload
						? state.currentCity
						: {},
				cities: state.cities.filter(city => city.id !== action.payload),
			};
		case 'error':
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			throw new Error('Action Unknown!');
	}
}

function CitiesProvider({ children }) {
	const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	useEffect(function () {
		async function getCitites() {
			dispatch({ type: 'loading' });
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({ type: 'cities/loaded', payload: data });
			} catch {
				dispatch({ type: 'error', payload: 'Fialed Fetching Cities!' });
			}
		}
		getCitites();
	}, []);

	async function getCity(id) {
		if (currentCity.id === Number(id)) return;
		dispatch({ type: 'loading' });
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			dispatch({ type: 'city/loaded', payload: data });
		} catch {
			dispatch({ type: 'error', payload: 'Failed Fetching City!' });
		}
	}

	async function createCity(newCity) {
		dispatch({ type: 'loading' });
		try {
			const res = await fetch(`${BASE_URL}/cities/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCity),
			});
			const data = await res.json();
			dispatch({ type: 'city/created', payload: data });
		} catch {
			dispatch({ type: 'error', payload: 'Failed Creating City!' });
		}
	}

	async function deleteCity(id) {
		dispatch({ type: 'loading' });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});
			dispatch({ type: 'city/deleted', payload: id });
		} catch {
			dispatch({ type: 'error', payload: 'Failed Deleting City!' });
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				currentCity,
				isLoading,
				error,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (!context)
		throw new Error('CitiesContext used outside of CitiesProvider!');
	return context;
}

// eslint-disable-next-line
export { CitiesProvider, useCities };
