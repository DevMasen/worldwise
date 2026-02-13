import { useEffect, useState } from 'react';
import styles from './CityItem.module.css';
import PropTypes from 'prop-types';
CityItem.propTypes = {
	city: PropTypes.object,
};

const formatDate = date =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));

function CityItem({ city }) {
	const { cityName, date, country } = city;
	const [flagUrl, setFlagUrl] = useState('');
	useEffect(
		function () {
			async function getFlag() {
				try {
					const res = await fetch(
						`https://restcountries.com/v3.1/name/${country}`,
					);
					if (!res.ok) throw new Error('Faies to Fetch Flag!');
					const data = await res.json();
					setFlagUrl(data[0].flags.svg);
				} catch (err) {
					console.error(err.message);
				}
			}
			getFlag();
		},
		[country],
	);

	return (
		<li className={styles.cityItem}>
			<span className={styles.flagContainer}>
				<img src={flagUrl} width="100%" alt="!" />
			</span>
			<h3 className={styles.name}>{cityName}</h3>
			<time className={styles.date}>({formatDate(date)})</time>
			<button className={styles.deleteBtn}>&times;</button>
		</li>
	);
}

export default CityItem;
