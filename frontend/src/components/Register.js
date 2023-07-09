import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

function Register({ formValue, onRegister, onFormChange }) {
  return (
    <section className='sign-form'>
      <h1 className='sign-form__title'>Регистрация</h1>
      <LoginForm
        formValue={formValue}
        onAction={onRegister}
        onFormChange={onFormChange}
        buttonText='Зарегистрироваться'
      />
      <p className='sign-form__text'>
        Уже зарегистрированы?{' '}
        <Link className='sign-form__link' to='/sign-in'>
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
