import { Link, useLocation } from 'react-router-dom';

function Navigation({ loggedIn, email, onSignOut, handleBurgerMenuOpen }) {
  const location = useLocation();

  return (
    <>
      {loggedIn && <p className='header__email'>{email}</p>}
      {loggedIn && location.pathname === '/' && (
        <Link
          to='/'
          className='header__link header__link_signed-in'
          onClick={() => {
            onSignOut();
            if (handleBurgerMenuOpen) {
              handleBurgerMenuOpen();
            }
          }}
        >
          Выйти
        </Link>
      )}
      {!loggedIn && location.pathname === '/sign-in' && (
        <Link
          to='/sign-up'
          className='header__link'
          onClick={handleBurgerMenuOpen}
        >
          Зарегистрироваться
        </Link>
      )}
      {!loggedIn && location.pathname === '/sign-up' && (
        <Link
          to='/sign-in'
          className='header__link'
          onClick={handleBurgerMenuOpen}
        >
          Войти
        </Link>
      )}
    </>
  );
}

export default Navigation;
