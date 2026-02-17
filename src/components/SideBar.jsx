import styles from './SideBar.module.css';
//////////////////////////////////////////
import { Outlet } from 'react-router-dom';
//////////////////////////////////////////
import AppNav from './AppNav';
import Logo from './Logo';
//////////////////////////////
function SideBar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			{/* React Router Outlet Component acts like children prop  */}
			<Outlet />

			<footer className={styles.footer}>
				<p className={styles.copyright}>
					&copy; Copyright {new Date().getFullYear()} by WorldWise
					Inc.
				</p>
			</footer>
		</div>
	);
}

export default SideBar;
