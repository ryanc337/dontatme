import React from 'react';
import EmailBody from './EmailBody';
import EmailAttachments from './EmailAttachments';

const Email = ({ attachments, html }) => (
  <div className="email">
    <EmailBody
      html={html}
    />
    <div className="email-attachments-container">
      {attachments[0] && <EmailAttachments attachments={attachments} />}
    </div>
  </div>
);

export default Email;
