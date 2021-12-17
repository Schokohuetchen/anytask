import React, { FC } from 'react';
import Button from './Button';
import TextField from './TextField';

const Login: FC = (): JSX.Element => {
  return (
    <div className="login">
      <TextField />
      <Button isUppercase isLarge buttonText="Login" onClick={(e) => console.log('let me in!')} />
    </div>
  );
};

export default Login;
