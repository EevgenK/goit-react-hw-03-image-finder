import styles from './button.module.scss';
import PropTypes from 'prop-types';
const Button = ({ text, onClick }) => {
  return (
    <button type="button" className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;
Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
