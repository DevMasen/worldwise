import styles from './AppNav.module.css';
/////////////////////////////////////////
import { NavLink } from 'react-router-dom';
/////////////////////////////////////////
function AppNav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink to="cities">CITIES</NavLink>
				</li>
				<li>
					<NavLink to="contries">CONTRIES</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default AppNav;
