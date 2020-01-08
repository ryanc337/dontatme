import React from 'react';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';

const EmailItem = ({ renderEmail, setFocusPanel }) => {
  return(
    <div className="EmailItem">
      <EmailItemHeader setFocusPanel={setFocusPanel} />
      <Email renderEmail={renderEmail} />
    </div>
  );
}

export default EmailItem;