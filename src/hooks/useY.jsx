import { useState, useEffect, useCallback } from 'react';

const useY = (el) => {
  const [y, setY] = useState(null);

  const handleResize = useCallback(() => {
    const element = document.getElementById(el);
    const curY = element.offsetTop + element.offsetHeight;
    if (y !== curY) {
      setY(curY);
    }
  }, [el, y]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return y;
};

export default useY;
