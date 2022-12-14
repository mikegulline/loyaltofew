import Link from './Link';

const ColorLinks = ({
  colors,
  link,
  align = '',
  scroll = true,
  className = '',
}) => {
  const wrapperClass = `flex items-center ${
    align ? 'justify-left' : 'justify-center'
  }`;

  const buildLinks = colors.map((color) => {
    const linkClasses = `w-8 h-8 rounded-full border solid border-white -mr-1 -ml-1 ${color
      .toLowerCase()
      .replace(' ', '')}`;
    const href = `${link}/${color.toLowerCase().replace(' ', '')}`;

    return (
      <Link
        className={linkClasses}
        key={color}
        href={href}
        title={color}
        scroll={scroll}
      >
        <div className='hidden'>{color}</div>
      </Link>
    );
  });

  return <div className={wrapperClass + ' ' + className}>{buildLinks}</div>;
};

export default ColorLinks;
