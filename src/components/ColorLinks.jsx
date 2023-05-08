import { useRouter } from 'next/router';
import Link from 'next/link';

const ColorLinks = (props) => {
  const router = useRouter();
  const {
    colors,
    link,
    align = ``,
    scroll,
    className = ``,
    hover,
    small = false,
  } = props;
  const alignClass = align ? `justify-${align}` : `justify-center`;
  const wrapperClasses = `flex items-center ${alignClass} ${className}`;

  return (
    <div className={wrapperClasses}>
      {colors.map((color) => {
        const colorName = color.toLowerCase().replace(` `, ``);
        const linkClasses = ` ${
          small ? 'w-9 h-9 lg:w-11 lg:h-11' : 'w-11 h-11'
        } cursor-pointer rounded-full border solid border-white -mr-1 -ml-1 ${colorName}`;
        const href = `${link}/${colorName}`;

        const handleEnter = () => {
          router.push(href, undefined, { scroll: false });
        };

        if (hover) {
          return (
            <div
              className={linkClasses}
              key={colorName}
              title={color}
              onMouseEnter={() => handleEnter()}
            >
              <div className='hidden'>{color}</div>
            </div>
          );
        }

        return (
          <Link
            className={linkClasses}
            key={colorName}
            href={href}
            title={color}
            scroll={scroll}
            prefetch={false}
          >
            <div className='hidden'>{color}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default ColorLinks;
