import React, { FC } from 'react';
import Header from './Header';
import Login from './Login';

const App: FC = (): JSX.Element => {
  const isLoggedIn = false;

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} />
      <div className="app__content">{!isLoggedIn && <Login />}</div>
    </div>
  );
};

export default App;
