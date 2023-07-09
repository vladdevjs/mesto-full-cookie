import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from './../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});
  const [isValid, setIsValid] = useState({ name: true, description: true });
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

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

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    setErrorMessage({
      ...errorMessage,
      description: e.target.validationMessage,
    });
    setIsValid({
      ...isValid,
      description: e.target.validity.valid,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
    setErrorMessage({});
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setErrorMessage({ name: ' ' });
      }}
      onSubmit={handleSubmit}
      buttonName={isLoading ? 'Сохранение...' : 'Сохранить'}
      isValid={isValid}
    >
      <fieldset className='form__fieldset'>
        <input
          type='text'
          name='name'
          id='name'
          minLength='2'
          maxLength='40'
          className='form__field form__field_type_name'
          placeholder='Имя'
          value={name || ''}
          onChange={handleNameChange}
          required
        />
        <span className='name-field-error form__field-error'>
          {errorMessage.name}
        </span>
        <input
          type='text'
          name='about'
          id='description'
          minLength='2'
          maxLength='200'
          className='form__field form__field_type_job'
          placeholder='Род деятельности'
          value={description || ''}
          onChange={handleDescriptionChange}
          required
        />
        <span className='description-field-error form__field-error'>
          {errorMessage.description}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
