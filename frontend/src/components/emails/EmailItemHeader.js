import React from 'react';

const EmailItemHeader = ({ setFocusPanel, deleteEmailWithId, from }) => {

  return (
    <nav className="heading">
      <div className="email-item-header">
        <div className="email-item-header__icon-container">
          <span className="email-item-header__initial">T</span>
        </div>
        <div>
          <span className="heading">{from}</span>
        </div>
        <div className="email-item-header__trash-container">
          <span className="email-item-header__back" onClick={()=> setFocusPanel('list')}>B</span>
          <span className="email-item-header__trash" onClick={deleteEmailWithId}>{from[0]}</span>
        </div>
      </div>
    </nav>
  );
}

export default EmailItemHeader;
