import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
CitiesProvider.propTypes = {
	children: PropTypes.element,
};

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

function CitiesProvider({ children }) {
	const [cities, setCitites] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(function () {
		async function getCitites() {
			setIsLoading(true);
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCitites(data);
			} catch {
				alert('Failed to Fetch Cities!');
			} finally {
				setIsLoading(false);
			}
		}
		getCitites();
	}, []);

	async function getCity(id) {
		setIsLoading(true);
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch {
			alert('Failed to download city data!');
		} finally {
			setIsLoading(false);
		}
	}

	async function createCity(newCity) {
		setIsLoading(true);
		try {
			const res = await fetch(`${BASE_URL}/cities/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCity),
			});
			const data = await res.json();
			setCitites([...cities, data]);
		} catch {
			alert('Failed to upload city data!');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
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

/* eslint-disable */
export { CitiesProvider, useCities };
