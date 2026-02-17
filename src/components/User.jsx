import styles from './User.module.css';
////////////////////////////////////////
import { useNavigate } from 'react-router-dom';
////////////////////////////////////////////////
import { useAuth } from '../contexts/AuthContext';
///////////////////////////////////////////////////

function User() {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	function handleClick() {
		logout();
		navigate('/');
	}

	if (!user) return null;

	return (
		<div className={styles.user}>
			<img src={user.avatar} alt={user.name} />
			<span>Welcome, {user.name}</span>
			<button onClick={handleClick}>Logout</button>
		</div>
	);
}

export default User;
