import React from 'react';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';

const EmailItem = ({ email, setFocusPanel }) => {
  return(
    <div className="EmailItem">
      <EmailItemHeader setFocusPanel={setFocusPanel} />
      <Email email={email} />
    </div>
  );
}

export default EmailItem;