import styles from './Container.module.css';

const getSizeClass = (size) => {
  if (!size) return;

  let returnSize;

  switch (size) {
    case 'large':
    case 'lg':
      returnSize = styles.containerLarge;
      break;
    case 'small':
    case 'sm':
      returnSize = styles.containerSmall;
      break;
    case 'extra small':
    case 'extrasmall':
    case 'xs':
      returnSize = styles.containerExtraSmall;
      break;
  }

  return returnSize;
};

const Container = ({ children, className, size }) => {
  const passSizeClass = getSizeClass(size);
  const passClassName = className ? className : '';
  return (
    <div className={`${styles.container} ${passSizeClass} ${passClassName}`}>
      {children}
    </div>
  );
};

export default Container;
