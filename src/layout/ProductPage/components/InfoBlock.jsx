import { useState, useEffect } from 'react';
import Title from './Title';
import WrapColorLinks from './WrapColorLinks';
import Details from './Details';
import Dimensions from './Dimensions';
import SelectSize from './SelectSize';

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
    colors: colorsState,
    link,
  };

  const selectSizeProps = {
    product,
    handleChange: setIndex,
    index,
  };

  return (
    <div className='mt-8 w-full px-0 xl:mt-0 xl:px-20 2xl:px-28'>
      <Title {...titleProps} />
      <Dimensions {...dimensionsProps} />
      <Details {...detailsProps} />
      {/* <WrapColorLinks {...wrapColorLinksProps} /> */}
      <SelectSize {...selectSizeProps} />
    </div>
  );
};

export default InfoBlock;
