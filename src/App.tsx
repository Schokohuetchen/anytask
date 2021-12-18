import React, { FC } from 'react';
import Header from './Header';
import Login from './Login';
import TodoList from './TodoList';

const App: FC = (): JSX.Element => {
  const isLoggedIn = true;

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} />
      <div className="app__content">
        {!isLoggedIn && <Login />}
        {isLoggedIn && <TodoList />}
      </div>
    </div>
  );
};

export default App;
