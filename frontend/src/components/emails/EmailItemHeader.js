import React from 'react';

const EmailItemHeader = ({ setFocusPanel }) => {
  return (
    <nav className="EmailItemHeader">
      <img className="logo"></img>
      <i onClick={()=> setFocusPanel('list')}>Back</i>
      <i>Delete</i>
    </nav>
  );
}

export default EmailItemHeader;