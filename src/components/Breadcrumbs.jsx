import { Fragment } from 'react';
import Link from '@/components/Link';
import Container from '@/components/Container';

const Breadcrumbs = ({ links }) => {
  const buildLinks = links.map((link, i) => {
    let addSlash = i ? ' / ' : '';

    let showLink = !link[1] ? (
      link[0]
    ) : (
      <Link
        href={link[1]}
        className=' text-zinc-200 hover:text-white  hover:underline'
      >
        {link[0]}
      </Link>
    );

    return (
      <Fragment key={link[0]}>
        {addSlash}
        {showLink}
      </Fragment>
    );
  });

  return (
    <div className='bg-gray-900 py-2 text-sm font-light text-zinc-400 lg:py-3 xl:text-base'>
      <Container>
        <h5 className='truncate'>{buildLinks}</h5>
      </Container>
    </div>
  );
};

export default Breadcrumbs;
