import Link from 'next/link';
import { Fragment } from 'react';

const Breadcrumbs = ({ links }) => {
  return (
    <h5>
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
