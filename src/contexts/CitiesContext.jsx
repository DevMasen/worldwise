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
	useEffect(function () {
		async function getCitites() {
			setIsLoading(true);
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCitites(data);
			} catch {
				alert('Failed to Fetch Data!');
			} finally {
				setIsLoading(false);
			}
		}
		getCitites();
	}, []);
	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
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
