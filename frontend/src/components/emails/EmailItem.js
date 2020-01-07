import React from 'react';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';

const EmailItem = (props) => {
  return(
    <div className="EmailItem">
      <EmailItemHeader />
      <Email />
    </div>
  );
}

export default EmailItem;