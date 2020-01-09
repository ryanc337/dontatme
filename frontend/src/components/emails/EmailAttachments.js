import React from 'react';
import EmailAttachment from './EmailAttachment';

const EmailAttachments = ({ attachments }) => {
  return(
    <div className="EmailAttachments">
      {
        attachments.map((attachment, index) => {
          return(<EmailAttachment key={index} attachment={attachment}/>)
        })
      }
    </div>
  );
}

export default EmailAttachments;
