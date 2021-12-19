import React, { ChangeEvent, FC, useState } from 'react';
import Button from './Button';
import TextField from './TextField';
import { useDispatch } from 'react-redux';
import { authenticateUser } from './redux/authSlice';

const Login: FC = (): JSX.Element => {
  const [textInput, setTextInput] = useState<string>('');

  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(authenticateUser(textInput));
  };

  return (
    <form className="login">
      <div className="login__content">
        <TextField value={textInput} onChange={handleInputChange} placeholder="API TOKEN" />
        <Button
          disabled={!textInput}
          isUppercase
          isLarge
          buttonText="Login"
          onClick={handleLogin}
        />
      </div>
    </form>
  );
};

export default Login;
