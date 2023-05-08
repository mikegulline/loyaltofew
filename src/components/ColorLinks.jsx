import Link from 'next/link';

const ColorLinks = (props) => {
  const {
    color: currentColor,
    colors,
    link,
    align = ``,
    scroll,
    className = ``,
    small = false,
  } = props;
  const alignClass = align ? `justify-${align}` : `justify-center`;
  const wrapperClasses = `flex items-center ${alignClass} ${className}`;

  return (
    <div className={wrapperClasses}>
      {colors.map((color) => {
        const colorName = color.toLowerCase();
        const linkClasses = ` ${
          small ? 'w-9 h-9 lg:w-11 lg:h-11' : 'w-11 h-11'
        } cursor-pointer flex items-center justify-center rounded-full border solid border-white -mr-1 -ml-1 ${colorName}`;
        const href = `${link}/${colorName}`;

        return (
          <Link
            className={linkClasses}
            key={colorName}
            href={href}
            title={color}
            scroll={scroll}
            prefetch={false}
          >
            <div
              className={`relative h-4 w-4 rounded-full bg-white transition-all ${
                currentColor === color
                  ? 'scale-100 delay-200 duration-200 ease-out'
                  : 'scale-0 duration-200 ease-in'
              }`}
            ></div>
            <div className='hidden'>{color}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default ColorLinks;
