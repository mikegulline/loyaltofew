import ColorLinks from '@/components/ColorLinks';

const WrapColorLinks = ({ colors, link }) => {
  if (colors.length <= 1) return null;

  return (
    <>
      <p className='mb-2 font-bold'>Color Options</p>
      <ColorLinks
        colors={colors}
        link={link}
        align='left'
        scroll={false}
        className='mb-6'
      />
    </>
  );
};

export default WrapColorLinks;
