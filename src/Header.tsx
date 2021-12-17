import React, { FC } from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: FC<HeaderProps> = (): JSX.Element => {
  return (
    <div className="header">
      <div className="header__logo">
        <div className="header__tick-mark" />
        <div className="header__name">
          any<span className="header__name--bold">task</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
