import React, { ChangeEvent, FC, useState } from 'react';
import Button from './Button';
import TextField from './TextField';
import { useDispatch } from 'react-redux';
import { authenticateUser } from './redux/userSlice';

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
      <TextField value={textInput} onChange={handleInputChange} />
      <Button disabled={!textInput} isUppercase isLarge buttonText="Login" onClick={handleLogin} />
    </form>
  );
};

export default Login;
