import React from 'react';

const EmailListItem = ({ parseEmail, email, setFocusPanel }) => {
  const handleClick = () => {
    setFocusPanel('email');
    parseEmail()
  }

  return (
    <div className="EmailListItem" onClick={() => handleClick()}>
      <h1>{email.from}</h1>
      <p>{email.email_body}</p>
      <p>{email.subject}</p>
      <p>{email.sent_at}</p>
      {email.has_attachments && <p>paperclip</p>}
    </div>
  );
}

export default EmailListItem;