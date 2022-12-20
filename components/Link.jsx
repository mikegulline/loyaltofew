import Link from 'next/link';

const NextLink = ({ href, children, className }) => {
  return (
    <Link href={href} scroll={false} className={className && className}>
      {children}
    </Link>
  );
};

export default NextLink;
