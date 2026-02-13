import AppNav from './AppNav';
import Logo from './Logo';
import styles from './SideBar.module.css';
function SideBar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			<p>List of Cities</p>
			<footer className={styles.footer}>
				&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
			</footer>
		</div>
	);
}

export default SideBar;
