import React from 'react';

const EmailItemHeader = ({ setFocusPanel, deleteEmailWithId }) => {

  return (
    <nav className="email-item-header">
      <img className="logo"></img>
      <i onClick={()=> setFocusPanel('list')}>Back</i>
      <i onClick={deleteEmailWithId}>Delete</i>
    </nav>
  );
}

export default EmailItemHeader;
