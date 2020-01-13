import React from 'react';
import EmailAttachment from './EmailAttachment';

const EmailAttachments = ({ attachments }) => {
  return(
    <div className="email-attachments">
      {attachments.map((attachment, index) => (
        <EmailAttachment key={index} attachment={attachment}/>
      ))}
    </div>
  );
}

export default EmailAttachments;
