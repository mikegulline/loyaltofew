import Link from 'next/link';

const NextLink = ({ href, children, className, scroll = false }) => {
  return (
    <Link href={href} scroll={scroll} className={className && className}>
      {children}
    </Link>
  );
};

export default NextLink;
