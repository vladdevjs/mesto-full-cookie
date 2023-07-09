import { useEffect } from 'react';

const useEscapeKey = (callback) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [callback]);
};

export default useEscapeKey;
