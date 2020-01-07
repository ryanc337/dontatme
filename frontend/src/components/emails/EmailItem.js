import React from 'react';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';
import EmailAttachments from './EmailAttachments';

export default function EmailItem(props) {
  return(
    <div className="EmailItem">
      <EmailItemHeader />
      <Email />
      <EmailAttachments />
    </div>
  )
}