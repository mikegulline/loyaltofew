import PageWrapper from './components/PageWrapper';
import ColumnLayout from './components/ColumnLayout';
import HeroImage from './components/HeroImage';
import InfoBlock from './components/InfoBlock';
import LogoGallery from './components/LogoGallery';

const ProductPage = ({ product }) => {
  const productProps = {
    product,
  };
  return (
    <PageWrapper>
      <ColumnLayout>
        <HeroImage {...productProps} />
        <InfoBlock {...productProps} />
      </ColumnLayout>
      <LogoGallery {...productProps} />
    </PageWrapper>
  );
};

export default ProductPage;
