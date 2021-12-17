import React, { FC } from 'react';
import Header from './Header';

const App: FC = (): JSX.Element => {
  return (
    <div className="app">
      <Header isLoggedIn={false} />
    </div>
  );
};

export default App;
