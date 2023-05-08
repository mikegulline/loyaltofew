import { Autoplay } from 'swiper';
import Slideshow from './Slideshow';
import Image from 'next/image';
import Link from 'next/link';
import mens from '@/public/images/slideshow/ltf-slide-new-1.jpg';
import womens from '@/public/images/slideshow/ltf-slide-new-2.jpg';
import outerwear from '@/public/images/slideshow/ltf-slide-new-3.jpg';

const slidesArr = [
  {
    image: mens,
    alt: 'Mens',
    link: '/store/mens',
  },
  {
    image: womens,
    alt: 'Womens',
    link: '/store/womens',
  },
  {
    image: outerwear,
    alt: 'Outerwear',
    link: '/store/outerwear',
  },
];
const config = {
  autoplay: {
    delay: 5000,
  },
};
const modules = [Autoplay];

export default function HomeSlideshow() {
  return (
    <Slideshow
      className='home-slideshow pb-5 2xl:my-12'
      config={config}
      modules={modules}
    >
      {slidesArr.map(({ image, alt, link }, i) => (
        <Link key={i} href={link} prefetch={false}>
          <Image
            src={image}
            placeholder='blur'
            alt={alt}
            width='1536'
            height='768'
          />
        </Link>
      ))}
    </Slideshow>
  );
}
