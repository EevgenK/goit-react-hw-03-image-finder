import styles from './error-card.module.scss';

const ErrorCard = ({ text }) => {
  return (
    <div className={styles.block}>
      <p className={styles.message}>{text}</p>
    </div>
  );
};

export default ErrorCard;
