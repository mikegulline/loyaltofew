import Link from 'next/link';
import data from '@/public/data/menu';
import { useState } from 'react';

export default function MobileMenu() {
  const [selected, setSelected] = useState('');

  const handleSetSelected = (id) => {
    setSelected((currentId) => (id === currentId ? '' : id));
  };

  return (
    <ul className='my-10 border-t border-t-gray-300'>
      {data.map(({ name, location = '', subMenu = [] }) => {
        const itemKey = `menu-${name}`;
        const isSelected = itemKey === selected;
        const hasSubMenu = !!subMenu.length;
        return (
          <li key={itemKey} className='border-b border-b-gray-300'>
            <div className='flex h-16 items-center'>
              <Link href={location} className='flex-grow text-[45px]'>
                {name}
              </Link>
              {hasSubMenu && (
                <OpenClose
                  isSelected={isSelected}
                  onClick={() => handleSetSelected(itemKey)}
                />
              )}
            </div>
            {hasSubMenu && isSelected && (
              <ul>
                {subMenu.map(({ name, location }) => {
                  return (
                    <li key={`submenu-${name}`} className='text-[25px]'>
                      <Link href={location}>• {name}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function OpenClose({ isSelected, onClick }) {
  const classNames = isSelected
    ? 'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border  border-red-600 bg-red-600 text-white'
    : 'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-300 hover:border-red-600 hover:bg-red-600 hover:text-white';
  return (
    <div className={classNames} onClick={onClick}>
      {isSelected ? '-' : '+'}
    </div>
  );
}
