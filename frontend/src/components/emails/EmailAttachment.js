import React from 'react';

const EmailAttachment = ({ attachment }) => {

  const convertAttachment = () => {
    return window.URL.createObjectURL(new Blob([attachment.content], {type: `${attachment.contentType}`}));
  }
  return(
    <div className="Email-Attachment">
      <a href={convertAttachment()} download={attachment.filename}>{attachment.filename}</a>
    </div>
  );
}

export default EmailAttachment;
