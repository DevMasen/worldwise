import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
function PageNav() {
	const { isAuthenticated } = useAuth();
	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to="/product">PRODUCT</NavLink>
				</li>
				<li>
					<NavLink to="/pricing">PRICING</NavLink>
				</li>
				{!isAuthenticated && (
					<li>
						<NavLink to="/login" className={styles.ctaLink}>
							LOG IN
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default PageNav;
