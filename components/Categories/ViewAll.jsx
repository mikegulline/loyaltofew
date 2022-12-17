import Link from 'next/link';

const ViewAll = ({ href, name }) => {
  return (
    <div className='flex items-center justify-center'>
      <Link
        href={href}
        title={`view all ${name}`}
        className='black mb-6 flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-4 border-zinc-200 text-xl uppercase text-zinc-200 transition-all duration-300 ease-in-out hover:border-red-700 hover:text-red-700 xl:mb-10 xl:h-48 xl:w-48'
      >
        View All
      </Link>
    </div>
  );
};
export default ViewAll;
