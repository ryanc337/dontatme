import React from 'react';
import EmailAttachment from './EmailAttachment';

const EmailAttachments = ({ attachments }) => (
  <div className="email-attachments">
    {attachments.map((attachment) => (
      <EmailAttachment attachment={attachment} />
    ))}
  </div>
);

export default EmailAttachments;
