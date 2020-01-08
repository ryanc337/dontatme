import React from 'react';
import EmailBody from './EmailBody';
import EmailAttachments from './EmailAttachments';

const Email = ({ renderEmail }) => {
  return(
    <div className="Email">
      <EmailBody renderEmail={renderEmail} />
      {renderEmail.attachments && <EmailAttachments />}
    </div>
  );
}

export default Email;