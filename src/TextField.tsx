import React, { FC } from 'react';

const TextField: FC = (): JSX.Element => {
  return (
    <div className="textField">
      <input className="textField__input" type="text" placeholder="Api-Token" />
    </div>
  );
};

export default TextField;
