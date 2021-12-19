import React, { ChangeEvent, FC } from 'react';

interface TextFieldProps {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: FC<TextFieldProps> = ({ onChange, value, placeholder }): JSX.Element => {
  return (
    <div className="textField">
      <input
        className="textField__input"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextField;
