import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useRef, useEffect } from 'react';
import 'swiper/css/pagination';
import 'swiper/css';

export default function Carousel({ children }) {
  let breakpoints;
  if (children.length > 5) {
    breakpoints = {
      640: {
        slidesPerView: 2.5,
        spaceBetween: 12,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 3.5,
        spaceBetween: 12,
      },
      992: {
        slidesPerView: 4.5,
        spaceBetween: 12,
      },
      1200: {
        slidesPerView: 4.5,
        spaceBetween: 12,
      },
      1400: {
        slidesPerView: 5.5,
        spaceBetween: 32,
      },
    };
  } else if (children.length === 5) {
    breakpoints = {
      640: {
        slidesPerView: 2.5,
        spaceBetween: 12,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 3.5,
        spaceBetween: 12,
      },
      992: {
        slidesPerView: 4.5,
        spaceBetween: 12,
      },
      1200: {
        slidesPerView: 4.5,
        spaceBetween: 12,
      },
      1400: {
        slidesPerView: 5,
        spaceBetween: 32,
      },
    };
  } else if (children.length === 4) {
    breakpoints = {
      640: {
        slidesPerView: 2.5,
        spaceBetween: 12,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 3.5,
        spaceBetween: 12,
      },
      992: {
        slidesPerView: 3.5,
        spaceBetween: 12,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 12,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    };
  } else if (children.length === 3) {
    breakpoints = {
      640: {
        slidesPerView: 2.5,
        spaceBetween: 12,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1400: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    };
  } else if (children.length === 2) {
    breakpoints = {
      640: {
        slidesPerView: 2,
        spaceBetween: 12,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      1400: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
    };
  } else {
    breakpoints = {
      0: {
        slidesPerView: 1,
        spaceBetween: 12,
        centeredSlides: false,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 12,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 12,
      },
      992: {
        slidesPerView: 1,
        spaceBetween: 12,
      },
      1200: {
        slidesPerView: 1,
        spaceBetween: 12,
      },
      1400: {
        slidesPerView: 1,
        spaceBetween: 32,
      },
    };
  }
  const frameRef = useRef(null);
  const rightRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    if (frameRef?.current) {
      const [frame] =
        frameRef.current.getElementsByClassName('swiper-pagination');
      if (frame) {
        const first = frame.children[0];
        const last = frame.children[frame.children.length - 1];
        const observer = new MutationObserver((mutations) => {
          const pos = {
            first: first.classList.contains(
              'swiper-pagination-bullet-active-main'
            ),
            last: last.classList.contains(
              'swiper-pagination-bullet-active-main'
            ),
          };
          if (!pos.last) {
            rightRef.current.classList.remove('hidden');
            rightRef.current.classList.add('block');
            leftRef.current.classList.remove('block');
            leftRef.current.classList.add('hidden');
          } else {
            rightRef.current.classList.remove('block');
            rightRef.current.classList.add('hidden');
            leftRef.current.classList.remove('hidden');
            leftRef.current.classList.add('block');
          }
        });

        observer.observe(frame, {
          attributes: true,
          attributeFilter: ['class'],
        });
      }
    } else {
      rightRef.current.classList.remove('block');
      rightRef.current.classList.add('hidden');
    }
  }, []);

  return (
    <div className='relative' ref={frameRef} data-see='this'>
      <div
        ref={leftRef}
        className='pointer-events-none absolute left-0 top-0 bottom-0 z-10 hidden w-20 bg-gradient-to-l from-transparent to-white'
      ></div>
      <div
        ref={rightRef}
        className='pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-transparent to-white'
      ></div>
      <Swiper
        slidesPerView={2}
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
    </div>
  );
}
