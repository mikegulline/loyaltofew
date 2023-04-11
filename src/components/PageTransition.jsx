import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function PageTransition() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 100);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });
  if (loading)
    return (
      <div className='fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-white/70  text-gray-400 backdrop-blur-sm'></div>
    );
  return <div></div>;
}
