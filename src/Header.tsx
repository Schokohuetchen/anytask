import React, { FC } from 'react';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { removeAuthentication } from './redux/authSlice';

interface LogoProps {
  isLoggedIn: boolean;
}

const Logo: FC<LogoProps> = ({ isLoggedIn }): JSX.Element => {
  return (
    <div className={`logo ${isLoggedIn ? 'logo--is-logged-in' : ''}`}>
      <div className="logo__tick-mark" />
      <div className="logo__name">
        any<span className="logo__name--bold">task</span>
      </div>
    </div>
  );
};

const Header: FC = (): JSX.Element => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeAuthentication());
  };

  return (
    <div className={`header ${isLoggedIn ? 'header--is-logged-in' : ''}`}>
      <div className="header__content">
        <Logo isLoggedIn={isLoggedIn} />
        {isLoggedIn && (
          <Button layout="secondary" isUppercase buttonText="Logout" onClick={handleLogout} />
        )}
      </div>
    </div>
  );
};

export default Header;
