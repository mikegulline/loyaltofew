import useProductInfo from '../hooks/useProductInfo';
import Title from './Title';
import WrapColorLinks from './WrapColorLinks';
import Details from './Details';
import Dimensions from './Dimensions';
import Buttons from './Buttons';
import SizeToggle from './SizeToggle';

export const InfoBlock = ({ product }) => {
  const {
    titleProps,
    dimensionsProps,
    detailsProps,
    wrapColorLinksProps,
    sizeToggleProps,
    buttonsProps,
    sizesState,
  } = useProductInfo(product);

  return (
    <div className='mt-4 w-full px-0 xl:mt-0 xl:px-20 2xl:px-28'>
      <Title {...titleProps} />
      <Details {...detailsProps} />
      <Dimensions sizesState={sizesState} />
      <WrapColorLinks {...wrapColorLinksProps} />
      <SizeToggle {...sizeToggleProps} />
      <Buttons {...buttonsProps} />
    </div>
  );
};

export default InfoBlock;
