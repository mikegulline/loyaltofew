import Link from 'next/link';
import data from '@/public/data/menu';
import Container from '@/components/Container';
import { useState } from 'react';

export default function MobileMenu({ open, openCloseMobileMenu }) {
  const [selected, setSelected] = useState('');

  const handleSetSelected = (id) => {
    setSelected((currentId) => (id === currentId ? '' : id));
  };

  return (
    <div
      className={` fixed top-0 left-0 bottom-0 right-0 z-10 m-0  transition-all ${
        open
          ? ' translate-x-0 bg-white duration-300 ease-in'
          : ' translate-x-full bg-gray-200 delay-300 duration-300 ease-out'
      }`}
      style={{ boxShadow: 'inset 4px 0 0 #dc2626' }}
    >
      <div
        className={`h-full  overflow-x-hidden py-14  ${
          open
            ? ' translate-x-0 overflow-y-scroll duration-300 ease-in'
            : ' translate-x-full overflow-y-hidden delay-300 duration-300 ease-out'
        }`}
      >
        <Container>
          <div>
            <ul
              className={`my-10 border-t border-t-gray-300 transition-all ${
                open
                  ? '  translate-x-0 opacity-100 delay-300 duration-300 ease-out '
                  : '  translate-x-1/2 opacity-0 duration-300 ease-in'
              }`}
            >
              {data.map(({ name, location = '', subMenu = [] }) => {
                const itemKey = `menu-${name}`;
                const isSelected = itemKey === selected;
                const hasSubMenu = !!subMenu.length;
                return (
                  <li
                    key={itemKey}
                    className='overflow-hidden border-b border-b-gray-300'
                  >
                    <div className='flex h-16 items-center'>
                      <Link
                        href={location}
                        className='flex-grow text-[45px]'
                        onClick={() => openCloseMobileMenu(false)}
                      >
                        {name}
                      </Link>
                      {hasSubMenu && (
                        <OpenClose
                          isSelected={isSelected}
                          onClick={() => handleSetSelected(itemKey)}
                        />
                      )}
                    </div>
                    {hasSubMenu && (
                      <div
                        className={`overflow-hidden ${
                          isSelected ? ' h-auto' : ' h-0'
                        }`}
                      >
                        <ul className='mb-3 pl-2'>
                          {subMenu.map(({ name, location }) => {
                            return (
                              <li
                                key={`submenu-${name}`}
                                className='text-[25px]'
                              >
                                <Link
                                  href={location}
                                  onClick={() => openCloseMobileMenu(false)}
                                >
                                  <span className='text-red-600'>•</span> {name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}

export function OpenClose({ isSelected, onClick }) {
  const baseClasses =
    'flex h-8 w-8 mr-[8px] cursor-pointer items-center justify-center rounded-full  flex h-8 w-8 mr-[7px]  cursor-pointer items-center justify-center rounded-full';
  const classNames = `${baseClasses}  ${
    isSelected
      ? 'border border-gray-900 bg-gray-900 text-white'
      : 'border border-gray-300 bg-white text-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white'
  }`;
  return (
    <div className={classNames} onClick={onClick}>
      {isSelected ? '-' : '+'}
    </div>
  );
}
