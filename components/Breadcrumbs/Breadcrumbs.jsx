import Link from 'next/link';
import { Fragment } from 'react';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ links }) => {
  return (
    <h5 className={styles.breadcrumbs}>
      {links.map((link, i) => (
        <Fragment key={link[0]}>
          {i ? ' / ' : ''}
          {links.length === i + 1 ? (
            link[0]
          ) : (
            <Link href={link[1]}>{link[0]}</Link>
          )}
        </Fragment>
      ))}
    </h5>
  );
};

export default Breadcrumbs;
