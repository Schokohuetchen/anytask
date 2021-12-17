import React, { FC } from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
}

export const Logo: FC = (): JSX.Element => {
  return (
    <div className="logo">
      <div className="logo__tick-mark" />
      <div className="logo__name">
        any<span className="logo__name--bold">task</span>
      </div>
    </div>
  );
};

const Header: FC<HeaderProps> = (): JSX.Element => {
  return (
    <div className="header">
      <Logo />
    </div>
  );
};

export default Header;
