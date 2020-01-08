import React from 'react';
import EmailBody from './EmailBody';
import EmailAttachments from './EmailAttachments';

const Email = (props) => {
  return(
    <div className="Email">
      <EmailBody />
      {/* TODO: make attachments conditionally render */}
      <EmailAttachments />
    </div>
  );
}

export default Email;
