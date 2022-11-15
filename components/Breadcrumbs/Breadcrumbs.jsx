import Link from 'next/link';
import { Fragment } from 'react';
import Container from '../Container/Container';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ links }) => {
  const buildLinks = () =>
    links.map((link, i) => (
      <Fragment key={link[0]}>
        {i ? ' / ' : ''}
        {links.length === i + 1 ? (
          link[0]
        ) : (
          <Link href={link[1]}>{link[0]}</Link>
        )}
      </Fragment>
    ));
  return (
    <div className={styles.wrapper}>
      <Container>
        <h5 className={styles.breadcrumbs}>{buildLinks()}</h5>
      </Container>
    </div>
  );
};

export default Breadcrumbs;
