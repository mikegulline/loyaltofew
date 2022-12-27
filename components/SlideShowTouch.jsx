import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const SlideShowTouch = () => {
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
    {
      image: '/images/slideshow/ltf-slide-4.jpg',
      alt: 'Hats',
      link: '/store/hats',
    },
  ];

  const [index, setIndex] = useState(1);
  const router = useRouter();

  const wrapper = useRef();
  const items = useRef();
  const prev = useRef();
  const next = useRef();
  const posX1 = useRef(0);
  const posX2 = useRef(0);
  const posInitial = useRef(null);
  const posFinal = useRef(null);
  const threshold = useRef(100);
  const allowShift = useRef(true);
  const slidesLength = useRef(slidesArr.length);

  function preventDefault(e) {
    e.preventDefault();
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true;
        },
      })
    );
  } catch (e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;

  // call this to Disable
  function disableScroll() {
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  }

  // call this to Enable
  function enableScroll() {
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
  }

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();

    posInitial.current = items.current.offsetLeft;
    items.current.classList.remove('cursor-grab');
    items.current.classList.add('cursor-grabbing');

    if (e.type === 'touchstart') {
      posX1.current = e.touches[0].clientX;
      disableScroll();
    } else {
      posX1.current = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type === 'touchmove') {
      posX2.current = posX1.current - e.touches[0].clientX;
      posX1.current = e.touches[0].clientX;
    } else {
      posX2.current = posX1.current - e.clientX;
      posX1.current = e.clientX;
    }

    items.current.style.left = items.current.offsetLeft - posX2.current + 'px';
  }

  function dragEnd(e) {
    posFinal.current = items.current.offsetLeft;

    items.current.classList.add('cursor-grabbing');

    enableScroll();

    if (posFinal.current - posInitial.current < -threshold.current) {
      shiftSlide(1, 'drag');
    } else if (posFinal.current - posInitial.current > threshold.current) {
      shiftSlide(-1, 'drag');
    } else if (posFinal.current - posInitial.current === 0) {
      router.push(slidesArr[index - 1].link);
    }
    items.current.style.left = '0px';
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    items.current.classList.add(
      'transition',
      'translate-all',
      'ease-in-out',
      'duration-500'
    );
    items.current.classList.add('cursor-grab');
    items.current.classList.remove('cursor-grabbing');

    if (allowShift.current) {
      if (dir == 1) {
        setIndex((i) => i + 1);
      } else if (dir === -1) {
        setIndex((i) => i - 1);
      }
    }

    allowShift.current = false;
  }

  function checkIndex() {
    items.current.classList.remove(
      'transition',
      'translate-all',
      'ease-in-out',
      'duration-500'
    );

    if (index === 0) {
      setIndex(slidesLength.current);
    }
    if (index === slidesLength.current + 1) {
      setIndex(1);
    }

    allowShift.current = true;
  }

  const Nav = () => {
    return (
      <div className='absolute bottom-0 right-0 flex gap-px'>
        <a
          id='prev'
          onClick={() => shiftSlide(-1)}
          className='flex h-12 w-12 cursor-pointer items-center justify-center bg-black/50 pb-2 text-xl text-white/50 transition-all ease-in-out hover:bg-black hover:pb-1 hover:text-white lg:h-14 lg:w-14 lg:text-3xl 2xl:h-20 2xl:w-20 2xl:text-4xl'
          ref={prev}
        >
          {'<'}
        </a>
        <a
          id='next'
          onClick={() => shiftSlide(1)}
          className='flex h-12 w-12 cursor-pointer items-center justify-center bg-black/50 pb-2 text-xl text-white/50 transition-all ease-in-out hover:bg-black hover:pb-1 hover:text-white lg:h-14 lg:w-14 lg:text-3xl 2xl:h-20 2xl:w-20 2xl:text-4xl'
          ref={next}
        >
          {'>'}
        </a>
      </div>
    );
  };

  const buildSlides = () => {
    const buildSlidesArray = [...slidesArr];
    buildSlidesArray.unshift(slidesArr[slidesArr.length - 1]);
    buildSlidesArray.push(slidesArr[1]);

    return buildSlidesArray.map(({ image, alt, link }, i) => (
      <span key={i} className='inline-block w-full' data-link={link}>
        <Image
          src={image}
          alt={alt}
          width='1320'
          height='660'
          className='block h-auto w-full'
        />
      </span>
    ));
  };

  // buildSlides.unshift(buildSlides[buildSlides.length - 1]);
  // buildSlides.push(buildSlides[1]);

  const slideParams = {
    id: 'slides',
    className: 'flex relative translate-x-full cursor-grab left-0 ',
    ref: items,
    onMouseDown: dragStart,
    onTouchStart: dragStart,
    onTouchMove: dragAction,
    onTouchEnd: dragEnd,
    onTransitionEnd: checkIndex,
  };

  return (
    <div id='slider' className='relative 2xl:my-12' ref={wrapper}>
      <div className='overflow-hidden'>
        <div
          {...slideParams}
          style={{
            width: `${(slidesLength.current + 2) * 100}%`,
            transform: `translate(-${
              100 / ((slidesLength.current + 2) / index)
            }%)`,
          }}
        >
          {buildSlides()}
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default SlideShowTouch;
