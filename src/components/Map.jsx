import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
function Map() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');
	return (
		<div className={styles.mapContainer} onClick={() => navigate('form')}>
			<h1>Position:</h1>
			<h2>Lat: {lat}</h2>
			<h2>Lng: {lng}</h2>
			<button onClick={() => setSearchParams({ lat: 26, lng: 21 })}>
				Change Position
			</button>
		</div>
	);
}

export default Map;
