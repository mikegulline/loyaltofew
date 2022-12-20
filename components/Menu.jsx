import Link from './Link';
import { useRouter } from 'next/router';

const Menu = ({
  menuData,
  className = 'mainMenu',
  withDropDowns = false,
  title = '',
  activeClass,
}) => {
  const router = useRouter();

  const buildMenu = menuData.map(({ name, location, subMenu }) => (
    <li key={name} className={router.asPath == location ? activeClass : ''}>
      <Link href={location}>{name}</Link>
      {subMenu && withDropDowns && (
        <Menu menuData={subMenu} className='subMenu' />
      )}
    </li>
  ));

  return (
    <div className={className}>
      {title && <h4>{title}</h4>}
      <ul>{buildMenu}</ul>
    </div>
  );
};

export default Menu;
