import React from 'react';
import EmailBody from './EmailBody';
import EmailAttachments from './EmailAttachments';

const Email = ({ attachments, html }) => {
  return(
    <div className="Email">
      <EmailBody 
      html={html}
      />
      {attachments && <EmailAttachments attachments={attachments}/>}
    </div>
  );
}

export default Email;
