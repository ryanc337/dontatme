import React from 'react';
import { ReactComponent as SuccessIcon } from '../../assets/flashSymbol_success.svg';
import { ReactComponent as WarningIcon } from '../../assets/flashSymbol_warning.svg';
import { ReactComponent as ErrorIcon } from '../../assets/flashSymbol_error.svg';
import { ReactComponent as InformatonIcon } from '../../assets/flashSymbol_information.svg';

const Alert = ({ message, color, closeAlert }) => {

  const flashSpecs = {
    green: { title: 'success', Icon: SuccessIcon },
    yellow: { title: 'warning', Icon: WarningIcon },
    red: { title: 'error', Icon: ErrorIcon },
    blue: { title: 'information', Icon: InformatonIcon },
  };
  
  const { title, Icon } = flashSpecs[color];

  return (
    <div className={`flash flash--${title}`}>
      <div className='flash__info'>
        <Icon />
        <div className='flash__text'>
          <div className='flash__title'>{title}</div>
          <div>{message}</div>
        </div>
      </div>
      <span className='flash__close' onClick={closeAlert}>&times;</span>
    </div>
  );
};

export default Alert;