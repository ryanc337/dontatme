import React from 'react';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import { ReactComponent as Back } from '../../assets/back.svg';
import { ReactComponent as LogoIcon } from '../../assets/dam-icon.svg';
import { WELCOME_ADDRESS } from '../../lib/constants';

const EmailItemHeader = ({ setFocusPanel, deleteEmailWithId, from, iconColors }) => (
  <header className="email-item-header">
    {from.address === WELCOME_ADDRESS ? (
      <LogoIcon />
    ) : (      
      <div className="initial-circle" style={{backgroundColor: iconColors[from.address]}}>{from.name[0].toUpperCase()}</div>
    )}
    <div className="email-item-header__from heading">{from.name}</div>
    <div className="email-item-header__control-items">
      <div
        className="email-item-header__control-item email-item-header__control-item--left"
        onClick={() => setFocusPanel('list')}
      >
        <Back />
      </div>
      <div className="email-item-header__control-item" onClick={deleteEmailWithId}>
        <Trash />
      </div>
    </div>
  </header>
);

export default EmailItemHeader;
