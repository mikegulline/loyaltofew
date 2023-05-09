import ColorLinks from '@/components/ColorLinks';

const WrapColorLinks = ({ color, colors, link }) => {
  if (colors.length <= 1) return null;

  return (
    <div className='hidden xl:block'>
      {/* <p className='mb-2 font-bold'>Color Options</p> */}
      <ColorLinks
        color={color}
        colors={colors}
        link={link}
        align='left'
        className='mb-6'
      />
    </div>
  );
};

export default WrapColorLinks;
