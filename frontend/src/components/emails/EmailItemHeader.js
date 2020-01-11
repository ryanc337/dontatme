import React from 'react';

const EmailItemHeader = ({ setFocusPanel, deleteEmailWithId, allEmails, focusId }) => {
  const emailArray = [ allEmails.filter((email) => email.id === focusId) ]
  const email = emailArray[0][0];
  const { from } = email;
  const senderName = JSON.parse(from)[0].name

  return (
    <nav className="heading">
      <div className="email-item-header">
        <div className="email-item-header__icon-container">
          <span className="email-item-header__initial">T</span>
        </div>
        <div>
          <span className="heading">{senderName}</span>
        </div>
        <div className="email-item-header__trash-container">
          <span className="email-item-header__back" onClick={()=> setFocusPanel('list')}>B</span>
          <span className="email-item-header__trash" onClick={deleteEmailWithId}>{senderName[0]}</span>
        </div>
      </div>
    </nav>
  );
}

export default EmailItemHeader;
