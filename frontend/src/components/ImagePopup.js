import React from 'react';
import usePopupOverlay from '../utils/usePopupOverlay';

function ImagePopup({ isOpen, card, onClose }) {
  usePopupOverlay(isOpen, onClose);
  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__image-container'>
        <img
          src={`${card ? card.link : ''}`}
          alt={`${card ? card.name : ''}`}
          className='popup__image'
        />
        <h3 className='popup__image-title'>{`${card ? card.name : ''}`}</h3>
        <button
          type='button'
          className='popup__close'
          aria-label='Закрыть форму'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
