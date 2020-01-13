import React from 'react';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import { ReactComponent as Back } from '../../assets/back.svg';

const EmailItemHeader = ({ setFocusPanel, deleteEmailWithId, from }) => (
  <header className="email-item-header">
    <div className="initial-circle">T</div>
    <div className="email-item-header__from heading">{from}</div>
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
