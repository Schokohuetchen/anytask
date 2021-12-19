import React, { FC } from 'react';
import Header from './Header';
import Login from './Login';
import TodoList from './TodoList';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const App: FC = (): JSX.Element => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div className="app">
      <Header />
      <div className="app__content">
        {!isLoggedIn && <Login />}
        {isLoggedIn && <TodoList />}
      </div>
    </div>
  );
};

export default App;
