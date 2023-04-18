const getMeta = (meta, title, description) => {
  return {
    title:
      meta.title || title || `Loyal To Few® (LTF): A Trademarked Way Of Life`,
    description:
      meta.description ||
      description ||
      'Live a trademarked way of life in Loyal To Few® Hoodies, Tanks, Tees, Crops and Hats. We got your back!',
  };
};

export default getMeta;
