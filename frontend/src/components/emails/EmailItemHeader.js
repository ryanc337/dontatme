import React from 'react';

const EmailItemHeader = ({ setFocusPanel, deleteEmailWithId, from }) => {

  return (
    <header className="email-item-header">
      <div className="initial-circle">T</div>
      <div className="email-item-header__from heading">{from}</div>
      <div>
        <span className="email-item-header__control-item" onClick={()=> setFocusPanel('list')}>B</span>
        <span className="email-item-header__control-item" onClick={deleteEmailWithId}>T</span>
      </div>
    </header>
  );
}

export default EmailItemHeader;
