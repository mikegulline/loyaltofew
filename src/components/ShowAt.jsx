import { useState, useEffect } from 'react';

const ShowAt = ({ y, children }) => {
  const [shown, setShown] = useState(false);
  const [prevY, setPrevY] = useState(null);

  useEffect(() => {
    if (!shown) {
      const handleScroll = (e) => {
        const curY = e.target.documentElement.scrollTop;
        if (prevY && prevY < curY) {
          if (curY >= y) setShown(true);
        }
        setPrevY(curY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });

  if (!shown) return null;

  return <>{children}</>;
};

export default ShowAt;
