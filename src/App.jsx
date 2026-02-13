import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

const BASE_URL = 'http://localhost:8000';
function App() {
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
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="/login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					<Route index element={<Navigate to="cities" replace />} />
					<Route
						path="cities"
						element={
							<CityList cities={cities} isLoading={isLoading} />
						}
					/>
					<Route path="cities/:id" element={<City />} />
					<Route
						path="contries"
						element={
							<CountryList
								cities={cities}
								isLoading={isLoading}
							/>
						}
					/>
					<Route path="form" element={<Form />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
