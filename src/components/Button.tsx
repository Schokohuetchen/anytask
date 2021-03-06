import React, { FC } from 'react';

type Layout = 'primary' | 'secondary';

export interface ButtonProps {
  layout?: Layout;
  isLarge?: boolean;
  disabled?: boolean;
  buttonText: string;
  isUppercase?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<ButtonProps> = ({
  layout = 'primary',
  isLarge,
  disabled = false,
  buttonText,
  isUppercase,
  onClick = () => {},
}): JSX.Element => {
  return (
    <div className={`button-wrapper ${isLarge ? 'button-wrapper--is-large' : ''}`}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`button button--${layout === 'primary' ? 'primary' : 'secondary'} 
        ${isLarge ? 'button--is-large' : ''}`}
      >
        <span className={`button__text ${isUppercase ? 'button__text--is-uppercase' : ''}`}>
          {buttonText}
        </span>
      </button>
    </div>
  );
};

export default Button;
