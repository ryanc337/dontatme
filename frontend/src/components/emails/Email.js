import React from 'react';
import EmailBody from './EmailBody';
import EmailAttachments from './EmailAttachments';

const Email = ({ email }) => {
  return(
    <div className="Email">
      <EmailBody email={email} />
      {email.has_attachments && <EmailAttachments />}
    </div>
  );
}

export default Email;