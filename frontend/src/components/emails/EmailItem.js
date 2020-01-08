import React from 'react';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';

const EmailItem = ({ setFocusPanel, email }) => {
  console.log(email)
  return (
    <div className="EmailItem">
      <EmailItemHeader setFocusPanel={setFocusPanel} />
      <Email
      html={email.text}
      attachments={email.attachments}
      />
    </div>
  );
}

export default EmailItem;
