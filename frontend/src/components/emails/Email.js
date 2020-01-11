import React from 'react';
import moment from 'moment'
import EmailBody from './EmailBody';
import EmailAttachments from './EmailAttachments';

const Email = ({ attachments, html }) => {
  return(
    <div className="email">
      <EmailBody 
        html={html}
      />
      {attachments && <EmailAttachments attachments={attachments}/>}
    </div>
  );
}

export default Email;
