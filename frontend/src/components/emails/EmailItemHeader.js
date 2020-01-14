import React from 'react';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import { ReactComponent as Back } from '../../assets/back.svg';

const EmailItemHeader = ({ setFocusPanel, deleteEmailWithId, from, iconColors }) => {
  const style = {
    backgroundColor: `${iconColors[from.address]}`
  };
  
  return (
    <header className="email-item-header">
      <div className="initial-circle" style={style}>{from.name[0]}</div>
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
};

export default EmailItemHeader;
