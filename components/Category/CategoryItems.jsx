import GridBlock from '../GridBlock';
import GridBlockItem from '../GridBlockItem';
import ColorLinks from '../ColorLinks';

const CategoryItems = ({ product, title, color }) => {
  const { name, logos, colors } = product;

  const buildCategoryItems = logos.map((logo) => {
    const { link, image, name } = logo;

    let imageLink = `${link}/${colors[0].toLowerCase()}`;

    return (
      <GridBlockItem key={name} link={imageLink} image={image} name={name}>
        <ColorLinks colors={product.colors} link={link} />
      </GridBlockItem>
    );
  });

  return (
    <GridBlock name={title ? title : name}>{buildCategoryItems}</GridBlock>
  );
};

export default CategoryItems;
