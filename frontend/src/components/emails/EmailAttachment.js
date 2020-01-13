import React from 'react';
import { ReactComponent as Attachment } from '../../assets/attachment.svg';

const EmailAttachment = ({ attachment }) => {

  const convertAttachment = () => {
    return window.URL.createObjectURL(new Blob([attachment.content], {type: `${attachment.contentType}`}));
  }
  return(
    <div className="email-attachment">
      <Attachment />
      <a
        className="email-attachment__name"
        href={convertAttachment()}
        download={attachment.filename}
      >
        {attachment.filename}
      </a>
    </div>
  );
}

export default EmailAttachment;
