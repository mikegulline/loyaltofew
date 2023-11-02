import { useState, useEffect } from 'react';

const useProductInfo = (product) => {
  const { name, color, colors, logo, logos, sizes, details, link } = product;

  const getActiveColors = () => {
    const { colors: c } = logos.find((l) => l.logo === logo);
    return c;
  };
  const [activeColors, setActiveColors] = useState(getActiveColors);

  // sizes array
  const [sizesState, setSizesState] = useState([]);

  // current color index
  const [index, setIndex] = useState(0);

  // colors array
  // const [colorsState, setColorsState] = useState([]);

  // set sizes based on color
  useEffect(() => {
    setSizesState(
      sizes.filter((size) => {
        if ('colors' in size && !size?.colors?.includes(color)) {
          size['active'] = false;
        } else {
          size['active'] = true;
        }
        return size;
      })
    );
  }, [sizes, color]);

  // update current color index if !==
  useEffect(() => {
    if (sizesState.length && sizesState.length - 1 < index) {
      setIndex(sizesState.length - 1);
    }
  }, [sizesState, index]);

  // update colors array based on size
  useEffect(() => {
    const updateColors = sizesState[index]?.colors;
    if (updateColors) {
      setActiveColors(activeColors.filter((c) => updateColors.indexOf(c) >= 0));
    } else {
      setActiveColors(getActiveColors);
    }
    console.log(activeColors);
    // if (updateColors) setColorsState(updateColors);
    // else setColorsState(colors);
  }, [index, sizesState, colors, activeColors, getActiveColors]);

  const titleProps = { name: `${name} (${color})` };

  const dimensionsProps = {
    dimensions: sizesState[index]?.dimensions,
  };

  const detailsProps = {
    details,
    thisKey: name,
  };

  const wrapColorLinksProps = {
    color,
    colors,
    activeColors,
    link,
  };

  const sizeToggleProps = {
    sizes: sizesState,
    index,
    setIndex,
  };

  const buttonsProps = {
    product,
    index,
  };

  return {
    titleProps,
    dimensionsProps,
    detailsProps,
    wrapColorLinksProps,
    sizeToggleProps,
    buttonsProps,
    sizesState,
  };
};

export default useProductInfo;
