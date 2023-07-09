import successImage from '../images/success-image.svg';
import errorImage from '../images/error-image.svg';

const statusData = {
  success: {
    image: successImage,
    message: 'Вы успешно зарегистрировались!',
  },
  error: {
    image: errorImage,
    message: 'Что-то пошло не так! Попробуйте еще раз.',
  },
};

function InfoToolTip({ isOpen, toolTipStatus, onClose }) {
  const { image, message } = statusData[toolTipStatus];

  return (
    <div
      className={`popup popup_type_${toolTipStatus} ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className='popup__container'>
        <button
          type='button'
          className='popup__close'
          aria-label='Закрыть форму'
          onClick={onClose}
        ></button>
        <div className='tooltip'>
          <img className='tooltip__image' src={image} alt={message} />
          <p className='tooltip__message'>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoToolTip;
