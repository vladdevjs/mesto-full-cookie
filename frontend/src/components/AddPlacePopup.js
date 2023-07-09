import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const [isValid, setIsValid] = useState({ name: false, link: false });

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
    setErrorMessage({
      ...errorMessage,
      name: e.target.validationMessage,
    });
    setIsValid({
      ...isValid,
      name: e.target.validity.valid,
    });
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    setErrorMessage({
      ...errorMessage,
      link: e.target.validationMessage,
    });
    setIsValid({
      ...isValid,
      link: e.target.validity.valid,
    });
  }

  function handleReset() {
    setName('');
    setLink('');
    setErrorMessage({});
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }
  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      isOpen={isOpen}
      onClose={() => {
        onClose();
        handleReset();
      }}
      buttonName={isLoading ? 'Создание...' : 'Создать'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className='form__fieldset'>
        <input
          type='text'
          name='place'
          id='place'
          minLength='2'
          maxLength='30'
          className='form__field form__field_type_place'
          placeholder='Название'
          value={name || ''}
          onChange={handleNameChange}
          required
        />
        <span className='place-field-error form__field-error'>
          {errorMessage.name}
        </span>
        <input
          type='url'
          name='image'
          id='image'
          className='form__field form__field_type_image'
          placeholder='Ссылка на картинку'
          value={link || ''}
          onChange={handleLinkChange}
          required
        />
        <span className='image-field-error form__field-error'>
          {errorMessage.link}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
