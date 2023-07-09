import { useEffect } from 'react';

const usePopupOverlay = (isOpen, onClose) => {
  useEffect(() => {
    const handleOverlayClick = (event) => {
      if (event.target.classList.contains('popup')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOverlayClick);
    }

    return () => {
      document.removeEventListener('click', handleOverlayClick);
    };
  }, [isOpen, onClose]);
};

export default usePopupOverlay;
