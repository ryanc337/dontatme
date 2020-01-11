import React from 'react';
import moment from 'moment'
import EmailBody from './EmailBody';
import EmailAttachments from './EmailAttachments';

const Email = ({ attachments, html, from, date }) => {
  return(
    <div className="email">
      <EmailBody 
        date={moment(date).calendar()}
        from={from}
        html={html}
      />
      {attachments && <EmailAttachments attachments={attachments}/>}
    </div>
  );
}

export default Email;
