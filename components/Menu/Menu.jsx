import Link from 'next/link';

const Menu = ({
  menuData,
  className = 'mainMenu',
  withDropDowns = false,
  title = '',
}) => {
  const buildMenu = () => {
    return menuData.map(({ name, location, subMenu }) => (
      <li key={name}>
        <Link href={location}>{name}</Link>
        {subMenu && withDropDowns && (
          <Menu menuData={subMenu} className='subMenu' />
        )}
      </li>
    ));
  };
  return (
    <div className={className}>
      {title && <h4>{title}</h4>}
      <ul>{buildMenu()}</ul>
    </div>
  );
};

export default Menu;
