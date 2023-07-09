import React from 'react';
import usePopupOverlay from '../utils/usePopupOverlay';

function PopupWithForm({
  children,
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonName,
  isValid,
}) {
  usePopupOverlay(isOpen, onClose);
  const formIsValid =
    isValid && Object.values(isValid).every((value) => value === true);
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          className='popup__close'
          aria-label='Закрыть форму'
          onClick={onClose}
        ></button>
        <h3 className='popup__title'>{title}</h3>
        <form
          name={name}
          className={`form form_type_${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type='submit'
            className={`button ${formIsValid ? '' : 'button_disabled'}`}
            disabled={!formIsValid}
          >
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
