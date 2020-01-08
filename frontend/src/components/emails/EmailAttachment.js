import React from 'react';

const EmailAttachment = ({ attachment }) => {
  console.log(attachment)
  const convertAttachment = () => {
    console.log('gg');
    return window.URL.createObjectURL(new Blob([attachment.content], {type: `${attachment.contentType}`}));
  }
  return(
    <div className="Email-Attachment">
      <a 
      href={convertAttachment()} 
      download={attachment.filename}
      >attachment</a>
    </div>
  );
}

export default EmailAttachment;
