import React from 'react';
import EmailBody from './EmailBody';
import EmailAttachments from './EmailAttachments';

const Email = ({ attachments, html, from, date }) => {
  return(
    <div className="Email">
      <EmailBody 
      date={date}
      from={from}
      html={html}
      />
      {attachments && <EmailAttachments attachments={attachments}/>}
    </div>
  );
}

export default Email;
