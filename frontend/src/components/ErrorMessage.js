import React from 'react';
import errorImage from '../images/error.svg';

const ErrorMessage = ({ errorMessage }) => {
  return (
    <>
      {errorMessage && (
        <div className='error-popup'>
          <img src={errorImage} className='error-popup__image' alt='Ошибка' />
          <p className='error-popup__message'>{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;