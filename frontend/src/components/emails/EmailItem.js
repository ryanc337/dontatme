import React from 'react';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';

const EmailItem = ({ email }) => {
  return(
    <div className="EmailItem">
      <EmailItemHeader />
      <Email email={email} />
    </div>
  );
}

export default EmailItem;