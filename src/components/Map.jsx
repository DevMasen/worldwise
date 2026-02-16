import PropTypes from 'prop-types';
import styles from './Map.module.css';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';

import Button from './Button';
function Map() {
	const { cities } = useCities();
	const [searchParams] = useSearchParams();
	const [mapPosition, setMapPosition] = useState({ lat: 32.4, lng: 53.6 });
	const {
		position: geolocationPosition,
		isLoading: positionIsLoading,
		getPosition,
	} = useGeolocation();

	const mapLat = searchParams.get('lat');
	const mapLng = searchParams.get('lng');

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition({ lat: mapLat, lng: mapLng });
		},
		[mapLat, mapLng],
	);

	useEffect(
		function () {
			if (geolocationPosition)
				setMapPosition({
					lat: geolocationPosition.lat,
					lng: geolocationPosition.lng,
				});
		},
		[geolocationPosition],
	);

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type="position" onClick={getPosition}>
					{positionIsLoading ? 'Loading...' : 'Use My Position'}
				</Button>
			)}
			<MapContainer
				center={{ lat: mapPosition.lat, lng: mapPosition.lng }}
				zoom={5}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map(city => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span
								className={`fi fi-${city.countryCode}`}
							></span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

ChangeCenter.propTypes = {
	position: PropTypes.array,
};

function ChangeCenter({ position }) {
	useMap().setView({ lat: position.lat, lng: position.lng });
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click(e) {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}

export default Map;
