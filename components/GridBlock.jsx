import Carousel from './Carousel';
import { useState } from 'react';

const GridBlock = ({ name, children, className = '' }) => {
  const [showAll, setShowAll] = useState(false);

  const ToggleButton = () => {
    if (children.length > 3) {
      return (
        <div
          onClick={() => setShowAll((current) => !current)}
          className='cursor-pointer text-red-600 underline hover:text-gray-900'
        >
          {showAll ? 'Slideshow' : 'Show Grid'}
        </div>
      );
    }
    return null;
  };

  const ShowSlideshowGrid = () => {
    if (showAll) {
      return (
        <div className='mb-8 grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4  xl:gap-8'>
          {children}
        </div>
      );
    }
    return <Carousel>{children}</Carousel>;
  };

  return (
    <div className={`relative ${className}`}>
      <div className='relative mb-8 flex items-start justify-between after:absolute after:bottom-0 after:left-0 after:block after:h-1 after:w-16 after:bg-red-600'>
        <h2 className='pb-2 text-xl font-black uppercase text-gray-900 '>
          {name}
        </h2>
        <ToggleButton />
      </div>
      <ShowSlideshowGrid />
    </div>
  );
};

export default GridBlock;
