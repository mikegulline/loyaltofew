import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Slideshow.module.css';

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
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
    {
      image: '/images/slideshow/ltf-slide-4.jpg',
      alt: 'Hats',
      link: '/store/hats',
    },
  ];

  return (
    <div className={styles.slideshow}>
      <div
        className={styles.stage}
        style={{
          width: `${slides.length * 100}%`,
          transform: `translate(-${100 / (slides.length / currentSlide)}%)`,
        }}
      >
        {slides.map(({ image, alt, link }, i) => (
          <div key={i} className={styles.slide}>
            <Link href={link}>
              <Image src={image} alt={alt} width='1320' height='660' />
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.navigation}>
        {slides.map((a, i) => (
          <div
            key={i + 's'}
            onClick={() => setCurrentSlide(i)}
            className={currentSlide === i ? styles.active : ''}
          >
            <span>{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
