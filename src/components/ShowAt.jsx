'use client';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

const ShowAt = ({ y, children }) => {
  const [checkLayout, setCheckLayout] = useState(true);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [prevY, setPrevY] = useState(null);
  const [height, setHeight] = useState(null);
  const ref = useRef(null);

  useLayoutEffect(() => {
    setHeight(ref.current.clientHeight);
    setCheckLayout(false);
  }, []);

  useEffect(() => {
    if (showPlaceholder) {
      const handleScroll = (e) => {
        const curY = e.target.documentElement.scrollTop;
        if (prevY && prevY < curY) {
          if (curY >= y) setShowPlaceholder(false);
        }
        setPrevY(curY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [showPlaceholder, prevY, y]);

  if (checkLayout) return <div ref={ref}>{children}</div>;

  if (showPlaceholder) return <div style={{ height: `${height}px` }}></div>;

  return <div>{children}</div>;
};

export default ShowAt;
