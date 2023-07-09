import Navigation from './Navigation';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const handleBurgerMenuOpen = () => setIsBurgerMenuOpen(!isBurgerMenuOpen);
  return (
    <>
      <header className='header'>
        <nav
          className={`burger__menu${
            isBurgerMenuOpen ? ' burger__menu_opened' : ''
          }`}
        >
          <Navigation
            loggedIn={loggedIn}
            email={email}
            onSignOut={onSignOut}
            handleBurgerMenuOpen={handleBurgerMenuOpen}
          />
        </nav>
        <div className='header__container'>
          {loggedIn ? (
            <Link to='/' className='header__logo'></Link>
          ) : (
            <Link to='/sign-in' className='header__logo'></Link>
          )}
          <nav className='header__info'>
            <Navigation
              loggedIn={loggedIn}
              email={email}
              onSignOut={onSignOut}
            />
          </nav>
          <div
            className={`burger${isBurgerMenuOpen ? ' burger_close' : ''}`}
            onClick={handleBurgerMenuOpen}
          >
            <div className='burger__line'></div>
            <div className='burger__line'></div>
            <div className='burger__line'></div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
