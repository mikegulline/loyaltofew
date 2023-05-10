import Image from 'next/image';

const InfoSplit = ({ children, image }) => (
  <div className='xl:grid xl:grid-cols-2 2xl:min-h-[850px]'>
    <div className=' m-auto w-full px-4 py-10 md:max-w-screen-md lg:max-w-screen-lg xl:mr-0 xl:max-w-[624px] xl:px-0  xl:pr-5 2xl:max-w-[752px] 2xl:py-40 2xl:pr-40'>
      {children}
    </div>

    <div className='relative flex items-center justify-center'>
      <Image
        className='h-full w-full object-cover xl:absolute'
        src={image}
        placeholder='blur'
        alt='Loyal to Few®'
        width='2400'
        height='2400'
      />
    </div>
  </div>
);

export default InfoSplit;
