import React, { FC } from 'react';
import { ButtonProps } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faRedo } from '@fortawesome/free-solid-svg-icons';

type IconType = 'add' | 'delete' | 'reload';

interface RoundButtonProps extends Partial<ButtonProps> {
  icon?: IconType;
}

const RoundButton: FC<RoundButtonProps> = ({ isLarge, onClick, icon = 'add' }): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`roundButton ${isLarge ? 'roundButton--is-large' : ''}`}
      onClick={handleClick}
    >
      {icon === 'add' && <FontAwesomeIcon icon={faPlus} />}
      {icon === 'delete' && <FontAwesomeIcon icon={faTrashAlt} />}
      {icon === 'reload' && <FontAwesomeIcon icon={faRedo} />}
    </button>
  );
};

export default RoundButton;
