import { useState, useEffect, useCallback } from 'react';

const useProductInfo = (product) => {
  const { name, color, colors, logo, logos, sizes, details, link } = product;

  // current color sizeIndex
  const [sizeIndex, setSizeIndex] = useState(0);

  const getActiveColors = useCallback(() => {
    const { colors: c } = logos.find((l) => l.logo === logo);
    return c;
  }, [logos, logo]);

  const [activeColors, setActiveColors] = useState(getActiveColors);

  // sizes array
  const sizesArray = sizes.filter((size) => {
    if ('colors' in size && !size?.colors?.includes(color)) {
      size['active'] = false;
    } else {
      size['active'] = true;
    }
    return size;
  });

  const handleSetActiveColors = useCallback(
    (i) => {
      const updateColors = sizesArray[i]?.colors;
      if (updateColors) {
        const newColors = getActiveColors().filter(
          (c) => updateColors.indexOf(c) >= 0
        );
        // setActiveColors(newColors);
      } else {
        setActiveColors(getActiveColors);
        // setActiveColors(getActiveColors);
      }
    },
    [getActiveColors, sizesArray]
  );

  useEffect(() => {
    console.log('change size index');
    handleSetActiveColors(sizeIndex);
  }, [sizeIndex, handleSetActiveColors]);

  // update colors array based on size
  // useEffect(() => {
  //   const updateColors = sizesArray[sizeIndex]?.colors;
  //   if (updateColors) {
  //     setActiveColors(
  //       getActiveColors().filter((c) => updateColors.indexOf(c) >= 0)
  //     );
  //   } else {
  //     setActiveColors(getActiveColors);
  //   }
  // }, [sizeIndex, sizesArray, getActiveColors]);

  ////////////////////
  ////////////////////
  ////////////////////

  const titleProps = { name: `${name} (${color})` };

  const dimensionsProps = {
    dimensions: sizesArray[sizeIndex]?.dimensions,
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
    sizes: sizesArray,
    sizeIndex,
    setSizeIndex,
  };

  const addToCartProps = {
    product,
    sizeIndex,
  };

  return {
    titleProps,
    dimensionsProps,
    detailsProps,
    wrapColorLinksProps,
    sizeToggleProps,
    addToCartProps,
    sizesArray,
  };
};

export default useProductInfo;
