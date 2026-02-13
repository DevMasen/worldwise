import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import PropTypes from 'prop-types';
CountryList.propTypes = {
	cities: PropTypes.array,
	isLoading: PropTypes.bool,
};
function CountryList({ cities, isLoading }) {
	const countries = cities.reduce((arr, city) => {
		if (!arr.map(el => el.countryName).includes(city.country)) {
			return [
				...arr,
				{ countryName: city.country, countryCode: city.countryCode },
			];
		} else {
			return arr;
		}
	}, []);
	if (isLoading) return <Spinner />;
	if (countries.length === 0)
		return (
			<Message
				message={
					'Add your first country by clicking on a city on the map'
				}
			/>
		);
	return (
		<ul className={styles.countryList}>
			{countries.map(country => (
				<CountryItem country={country} key={country.countryCode} />
			))}
		</ul>
	);
}

export default CountryList;
