import styles from './PageNotFound.module.css';
//////////////////////////////////////////////
import Logo from '../components/Logo';
///////////////////////////////////////
export default function PageNotFound() {
	return (
		<div className={styles.main}>
			<Logo />
			<h1>Page not found :(</h1>
			<h3>Error 404</h3>
		</div>
	);
}
