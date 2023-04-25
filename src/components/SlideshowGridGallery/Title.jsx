import Link from 'next/link';

const Title = ({ content, link }) => {
  if (link) {
    return (
      <h2 className='pb-2 text-xl font-black uppercase text-gray-900 hover:text-red-600 '>
        <Link href={link}>{content}</Link>
      </h2>
    );
  }
  return (
    <h2 className='pb-2 text-xl font-black uppercase text-gray-900 '>
      {content}
    </h2>
  );
};

export default Title;
