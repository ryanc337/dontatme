import React from 'react';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';

const EmailItem = ({ setFocusPanel }) => {
  return(
    <div className="EmailItem">
      <EmailItemHeader setFocusPanel={setFocusPanel} />
      <Email />
    </div>
  );
}

export default EmailItem;
