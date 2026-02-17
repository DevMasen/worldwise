import styles from './CountryItem.module.css';
////////////////////////////////////////////////
import PropTypes from 'prop-types';
CountryItem.propTypes = {
	country: PropTypes.object,
};
////////////////////////////////////////////////
function CountryItem({ country }) {
	return (
		<li className={styles.countryItem}>
			<span className={`fi fi-${country.countryCode}`}></span>
			<span>{country.countryName}</span>
		</li>
	);
}

export default CountryItem;
