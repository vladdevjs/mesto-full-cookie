import React, { useRef, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef(null);
  const errorRef = useRef(null);
  const [isValid, setIsValid] = useState({ avatar: false });

  useEffect(() => {
    const avatarNode = avatarRef.current;
    if (isOpen) {
      avatarNode.value = '';
      errorRef.current.textContent = '';
      avatarNode?.addEventListener('input', handleChangeInput);
    }
    return () => {
      avatarNode?.removeEventListener('input', handleChangeInput);
    };
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current?.value,
    });
  }

  function handleChangeInput() {
    errorRef.current.textContent = avatarRef.current.validationMessage;
    setIsValid({ avatar: avatarRef.current.validity.valid });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      onSubmit={handleSubmit}
      buttonName={isLoading ? 'Сохранение...' : 'Сохранить'}
      isValid={isValid}
    >
      <fieldset className='form__fieldset'>
        <input
          type='url'
          name='avatar'
          id='avatar'
          className='form__field form__field_type_avatar'
          placeholder='Ссылка на аватар'
          ref={avatarRef}
          required
        />
        <span
          ref={errorRef}
          className='avatar-field-error form__field-error'
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
