import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';

export default function Slideshow({
  children,
  className = 'default-slideshow',
  breakpoints = {},
}) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      breakpoints={breakpoints}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Pagination]}
      grabCursor={true}
      className={className}
    >
      {children.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
