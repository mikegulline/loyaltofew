import Link from 'next/link';

const NextLink = ({ href, children, className, scroll = true }) => {
  return (
    <Link href={href} scroll={scroll} className={className && className}>
      {children}
    </Link>
  );
};

export default NextLink;
