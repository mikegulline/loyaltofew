import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './SlideShowTouch.module.css';

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

    enableScroll();

    if (posFinal.current - posInitial.current < -threshold.current) {
      shiftSlide(1, 'drag');
    } else if (posFinal.current - posInitial.current > threshold.current) {
      shiftSlide(-1, 'drag');
    }
    items.current.style.left = '0px';
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    items.current.classList.add(styles.shifting);

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
    items.current.classList.remove(styles.shifting);

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
      <div className={styles.nav}>
        <a
          id='prev'
          onClick={() => shiftSlide(-1)}
          className={styles.prev}
          ref={prev}
        >
          {'<'}
        </a>
        <a
          id='next'
          onClick={() => shiftSlide(1)}
          className={styles.next}
          ref={next}
        >
          {'>'}
        </a>
      </div>
    );
  };

  // const buildSlides = slidesArr.map(({ image, alt, link }, i) => (
  //   <span key={i} className={styles.slide}>
  //     <Link href={link}>
  //       <Image src={image} alt={alt} width='1320' height='660' />
  //     </Link>
  //   </span>
  // ));
  const buildSlides = slidesArr.map(({ image, alt, link }, i) => (
    <span key={i} className={styles.slide}>
      <Image src={image} alt={alt} width='1320' height='660' />
    </span>
  ));

  buildSlides.unshift(buildSlides[buildSlides.length - 1]);
  buildSlides.push(buildSlides[1]);

  const slideParams = {
    id: 'slides',
    className: styles.slides,
    ref: items,
    onMouseDown: dragStart,
    onTouchStart: dragStart,
    onTouchMove: dragAction,
    onTouchEnd: dragEnd,
    onTransitionEnd: checkIndex,
  };

  return (
    <div id='slider' className={styles.slider} ref={wrapper}>
      <div className={styles.wrapper}>
        <div
          {...slideParams}
          style={{
            width: `${(slidesLength.current + 2) * 100}%`,
            transform: `translate(-${
              100 / ((slidesLength.current + 2) / index)
            }%)`,
          }}
        >
          {buildSlides}
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default SlideShowTouch;
