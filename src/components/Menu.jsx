import { useRouter } from 'next/router';
import Link from 'next/link';

const Menu = ({
  menuData,
  className = 'mainMenu',
  withDropDowns = false,
  title = '',
  activeClass = 'active',
}) => {
  const router = useRouter();

  const buildMenu = menuData.map(
    ({ name, location, subMenu, onClick = () => {} }) => (
      <li key={name} className={router.asPath == location ? activeClass : ''}>
        <Link href={location} onClick={onClick} prefetch={false}>
          {name}
        </Link>
        {subMenu && withDropDowns && (
          <Menu menuData={subMenu} className='subMenu' />
        )}
      </li>
    )
  );

  return (
    <div className={className}>
      {title && <h4>{title}</h4>}
      <ul>{buildMenu}</ul>
    </div>
  );
};

export default Menu;
