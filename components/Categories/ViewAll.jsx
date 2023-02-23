import Link from '../Link';

const ViewAll = ({ href, name }) => {
  return (
    <div className=''>
      <div className='relative  w-full  rounded bg-zinc-100/50 pb-[100%]'>
        <div className='absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center'>
          <Link
            href={href}
            title={`view all ${name}`}
            className=' absolute flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-4 border-zinc-300 bg-white text-xl uppercase text-zinc-300 transition-all duration-300 ease-in-out hover:border-red-700  hover:text-red-700 xl:h-48 xl:w-48'
          >
            View All!
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ViewAll;
