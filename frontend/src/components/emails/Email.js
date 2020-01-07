import React from 'react';
import EmailBody from './EmailBody';
import EmailAttachments from './EmailAttachments';

export default function Email(props) {
  return(
    <div className="Email">
      <EmailBody/>
      <EmailAttachments />
    </div>
  )
}