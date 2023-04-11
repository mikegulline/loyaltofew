import Link from 'next/link';

const NextLink = ({
  href,
  children,
  className,
  scroll = true,
  handleClick = () => {},
}) => {
  return (
    <Link
      href={href}
      scroll={scroll}
      className={className && className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default NextLink;
