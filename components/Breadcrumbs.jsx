import Link from 'next/link';
import { Fragment } from 'react';
import Container from './Container/Container';

const Breadcrumbs = ({ links }) => {
  const buildLinks = links.map((link, i) => {
    return (
      <Fragment key={link[0]}>
        {i ? ' / ' : ''}
        {!link[1] ? (
          link[0]
        ) : (
          <Link
            href={link[1]}
            className=' text-zinc-200 hover:text-white  hover:underline'
          >
            {link[0]}
          </Link>
        )}
      </Fragment>
    );
  });

  return (
    <div className='bg-zinc-800 py-2 text-sm font-light text-zinc-400 lg:py-3 xl:text-base'>
      <Container>
        <h5 className='truncate'>{buildLinks}</h5>
      </Container>
    </div>
  );
};

export default Breadcrumbs;
