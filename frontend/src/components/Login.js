import LoginForm from './LoginForm';

function Login({ formValue, onLogin, onFormChange }) {
  return (
    <>
      <section className='sign-form'>
        <h1 className='sign-form__title'>Вход</h1>
        <LoginForm
          formValue={formValue}
          onAction={onLogin}
          onFormChange={onFormChange}
          buttonText='Войти'
        />
      </section>
    </>
  );
}

export default Login;
