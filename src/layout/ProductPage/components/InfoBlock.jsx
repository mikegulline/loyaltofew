import { useState, useEffect } from 'react';
import Title from './Title';
import WrapColorLinks from './WrapColorLinks';
import Details from './Details';
import Dimensions from './Dimensions';
import Buttons from './Buttons';

export const InfoBlock = ({ product }) => {
  const { name, color, colors, sizes, details, link } = product;

  const [index, setIndex] = useState(0);
  const [colorsState, setColorsState] = useState(() =>
    sizes?.colors ? sizes.colors : colors
  );

  useEffect(() => {
    if (sizes.length - 1 < index) {
      setIndex(sizes.length - 1);
    }
  }, [sizes, index]);

  useEffect(() => {
    const updateColors = sizes[index]?.colors;
    if (updateColors) setColorsState(updateColors);
    else setColorsState(colors);
  }, [index, sizes, colors]);

  const titleProps = { name: `${name} (${color})` };

  const dimensionsProps = {
    dimensions: sizes[index]?.dimensions,
  };

  const detailsProps = {
    details,
    thisKey: name,
  };

  const wrapColorLinksProps = {
    color,
    colors: colorsState,
    link,
  };

  const sizeToggleProps = {
    sizes,
    index,
    setIndex,
  };

  return (
    <div className='mt-8 w-full px-0 xl:mt-0 xl:px-20 2xl:px-28'>
      <Title {...titleProps} />
      <Dimensions {...dimensionsProps} />
      <Details {...detailsProps} />
      <WrapColorLinks {...wrapColorLinksProps} />
      <SizeToggle {...sizeToggleProps} />
      <Buttons product={product} index={index} />
    </div>
  );
};

const SizeToggle = ({ sizes, index, setIndex }) => {
  if (sizes.length === 1)
    return (
      <ul className='mb-6 flex w-auto shrink-0'>
        <li
          className={` flex h-16 w-auto select-none items-center justify-center gap-2 rounded border px-4`}
        >
          <div className='text-xl font-bold'>${sizes[index].price}</div>
          <div className='text-sm'>{sizes[index].size}</div>
        </li>
      </ul>
    );

  return (
    <ul className='mb-6 flex gap-1'>
      {sizes.map(({ size, price }, i) => {
        return (
          <li
            key={size}
            onClick={() => {
              setIndex(i);
            }}
            className={` flex h-14 w-14 select-none flex-col items-center justify-center rounded border lg:h-16 lg:w-16   ${
              index === i
                ? ' cursor-crosshair border-red-600 bg-red-600 text-white'
                : 'cursor-pointer border-gray-300 text-gray-500 hover:border-gray-800 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <div className='h-6 font-bold lg:text-xl'>{size}</div>
            <div className='text-sm'>${price}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default InfoBlock;
