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
    activeColors = [],
  } = props;
  const alignClass = align ? `justify-${align}` : `justify-center`;
  const wrapperClasses = `flex items-center ${alignClass} ${className}`;

  return (
    <div className={wrapperClasses}>
      {colors.map((color) => {
        let disableColor = false;
        let colorClass = 'cursor-pointer';
        if (activeColors.length && activeColors.indexOf(color) < 0) {
          disableColor = true;
          colorClass = 'opacity-20';
        }
        const colorName = color.toLowerCase();
        const linkClasses = ` ${
          small ? 'w-6 h-6 lg:w-8 lg:h-8' : 'w-11 h-11'
        }  flex items-center justify-center rounded mr-1 ${colorClass} ${colorName}`;
        const href = `${link}/${colorName}`;

        return (
          <DisableLink
            className={linkClasses}
            disabled={disableColor}
            key={colorName}
            href={href}
            title={color}
            scroll={false}
            prefetch={false}
            onClick={() => window.scrollTo(0, y)}
          >
            <ActiveDot active={currentColor === color} />
            <div className='hidden'>{color}</div>
          </DisableLink>
        );
      })}
    </div>
  );
};

const DisableLink = ({ children, disabled, className, ...rest }) => {
  if (disabled) return <div className={className}>{children}</div>;
  return (
    <Link className={className} {...rest}>
      {children}
    </Link>
  );
};

const ActiveDot = ({ active }) => {
  const classes = `relative h-4 w-4 rounded-full bg-white transition-all ${
    active
      ? 'scale-100 delay-200 duration-200 ease-out'
      : 'scale-0 duration-200 ease-in'
  }`;
  return <div className={classes}></div>;
};

export default ColorLinks;
