'use client';
import { useState, useEffect, useRef } from 'react';

const ShowAt = ({ y, children }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [prevY, setPrevY] = useState(null);
  const ref = useRef(null);

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

  if (showPlaceholder) return <div style={{ height: `5000px` }}></div>;

  return <div>{children}</div>;
};

export default ShowAt;
