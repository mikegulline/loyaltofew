import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';

export default function Slideshow({
  children,
  className = 'default-slideshow',
}) {
  return (
    <Swiper
      slidesPerView={1}
      modules={[Pagination]}
      grabCursor={true}
      className={className}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
    >
      {children.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
