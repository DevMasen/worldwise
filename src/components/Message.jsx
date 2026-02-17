import PropTypes from 'prop-types';
import styles from './Message.module.css';
Message.propTypes = {
	message: PropTypes.string,
	size: PropTypes.number,
};

function Message({ message, size = 1.8 }) {
	return (
		<p style={{ fontSize: `${size}rem` }} className={styles.message}>
			<span role="img">👋</span> {message}
		</p>
	);
}

export default Message;
