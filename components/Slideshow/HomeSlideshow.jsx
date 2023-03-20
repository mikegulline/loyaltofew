import Slideshow from './Slideshow';
import Image from 'next/image';
import Link from 'next/link';

const slidesArr = [
  {
    image: '/images/slideshow/ltf-slide-1.jpg',
    alt: 'Mens',
    link: '/store/mens',
  },
  {
    image: '/images/slideshow/ltf-slide-2.jpg',
    alt: 'Womens',
    link: '/store/womens',
  },
  {
    image: '/images/slideshow/ltf-slide-3.jpg',
    alt: 'Outerwear',
    link: '/store/outerwear',
  },
];

export default function HomeSlideshow() {
  return (
    <Slideshow className='home-slideshow 2xl:my-12'>
      {slidesArr.map(({ image, alt, link }, i) => (
        <Link key={i} href={link}>
          <Image src={image} alt={alt} width='1536' height='768' />
        </Link>
      ))}
    </Slideshow>
  );
}
