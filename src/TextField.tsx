import React, { ChangeEvent, FC } from 'react';

interface TextFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: FC<TextFieldProps> = ({ onChange, value }): JSX.Element => {
  return (
    <div className="textField">
      <input
        className="textField__input"
        type="text"
        placeholder="Api-Token"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextField;
