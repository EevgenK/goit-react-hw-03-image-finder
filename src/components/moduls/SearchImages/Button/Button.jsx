import styles from './button.module.scss';
const Button = ({ text, onClick }) => {
  return (
    <button type="button" className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;
