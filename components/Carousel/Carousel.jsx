import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';

export default function Carousel({ children }) {
  return (
    <Swiper
      slidesPerView={2.2}
      spaceBetween={8}
      breakpoints={{
        640: {
          slidesPerView: 3.5,
          spaceBetween: 8,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 4.5,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 32,
        },
      }}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Pagination]}
      grabCursor={true}
    >
      {children.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
