import React from 'react';

const EmailItemHeader = ({ setFocusPanel, deleteEmailWithId }) => {

  return (
    <nav className="EmailItemHeader">
      <img className="logo"></img>
      <i onClick={()=> setFocusPanel('list')}>Back</i>
      <i onClick={deleteEmailWithId}>Delete</i>
    </nav>
  );
}

export default EmailItemHeader;
