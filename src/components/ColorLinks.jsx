import Link from 'next/link';
import useY from '@/hooks/useY';

const ColorLinks = (props) => {
  const y = useY('page-header');

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
          small ? 'w-6 h-6 lg:w-8 lg:h-8' : 'w-11 h-11'
        } cursor-pointer flex items-center justify-center rounded mr-1  ${colorName}`;
        const href = `${link}/${colorName}`;

        return (
          <Link
            className={linkClasses}
            key={colorName}
            href={href}
            title={color}
            scroll={false}
            prefetch={false}
            onClick={() => window.scrollTo(0, y)}
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
