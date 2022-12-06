import styles from './Container.module.css';

const Container = ({ children, className }) => {
  return (
    <div className={`${styles.container} ${className ? className : ''}`}>
      {children}
    </div>
  );
};

export default Container;
