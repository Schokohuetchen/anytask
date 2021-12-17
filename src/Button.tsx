import React, { FC } from 'react';

type Layout = 'primary' | 'secondary';

interface ButtonProps {
  layout?: Layout;
  isLarge?: boolean;
  buttonText: string;
  isUppercase?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<ButtonProps> = ({
  layout = 'primary',
  isLarge,
  buttonText,
  isUppercase,
  onClick = () => {},
}): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('click');

    onClick(e);
  };

  return (
    <div className={`button-wrapper ${isLarge ? 'button-wrapper--is-large' : ''}`}>
      <button
        onClick={handleClick}
        className={`button ${layout === 'primary' ? 'button--primary' : 'button--secondary'} 
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
