import styles from './AppLayout.module.css';

import { useAuth } from '../contexts/AuthContext';

import SideBar from '../components/SideBar';
import Map from '../components/Map';
import User from '../components/User';
import Message from '../components/Message';

function AppLayout() {
	const { isAuthenticated } = useAuth();
	return (
		<div className={styles.app}>
			{isAuthenticated ? (
				<>
					<SideBar />
					<Map />
					<User />
				</>
			) : (
				<div className={styles.prelogin}>
					<Message message={'Please Login First!'} size={3} />
				</div>
			)}
		</div>
	);
}

export default AppLayout;
