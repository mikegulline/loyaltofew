import Image from 'next/image';

export default function Split({ children, image }) {
  return (
    <div className='xl:grid xl:grid-cols-2 2xl:min-h-[850px]'>
      <div className='ml m-auto w-full px-4 py-10 md:max-w-screen-md lg:max-w-screen-lg xl:mr-0 xl:max-w-[624px] xl:px-0  xl:py-40 xl:pr-32 2xl:max-w-[752px] 2xl:pr-40'>
        {children}
      </div>
      <Image
        object-fit='cover'
        src={image}
        placeholder='blur'
        alt='Loyal to Few'
        width='2400'
        height='2400'
      />
    </div>
  );
}
// md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:
