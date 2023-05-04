import PageWrapper from './components/PageWrapper';
import ColumnLayout from './components/ColumnLayout';
import HeroImage from './components/HeroImage';
import InfoBlock from './components/InfoBlock';
import LogoGallery from './components/LogoGallery';

const ProductPage = ({ product }) => {
  return (
    <PageWrapper>
      <ColumnLayout>
        <HeroImage {...{ product }} key={product.id} />
        <InfoBlock {...{ product }} />
      </ColumnLayout>
      <LogoGallery {...{ product }} />
    </PageWrapper>
  );
};

export default ProductPage;
