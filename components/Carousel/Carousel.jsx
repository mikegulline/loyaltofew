import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';

export default function Carousel({ children }) {
  let breakpoints;
  if (children.length >= 5) {
    breakpoints = {
      640: {
        slidesPerView: 2.25,
        spaceBetween: 12,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 3.25,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 4.25,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4.25,
        spaceBetween: 10,
      },
      1400: {
        slidesPerView: 5,
        spaceBetween: 32,
      },
    };
  } else if (children.length === 4) {
    breakpoints = {
      640: {
        slidesPerView: 2.25,
        spaceBetween: 12,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 3.25,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 3.25,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    };
  } else if (children.length === 3) {
    breakpoints = {
      640: {
        slidesPerView: 2.25,
        spaceBetween: 12,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1400: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    };
  }
  return (
    <Swiper
      slidesPerView={2.25}
      spaceBetween={8}
      breakpoints={breakpoints}
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
