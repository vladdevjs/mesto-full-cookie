import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({ isOpen, onClose, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm
      name='confirmation'
      title='Вы уверены?'
      isOpen={isOpen}
      onClose={onClose}
      buttonName='Да'
      isValid={true}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmationPopup;
