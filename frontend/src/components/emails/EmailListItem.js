import React from 'react';
import moment from 'moment';

const EmailListItem = ({ email, setFocusPanel, setFocusId, focusId }) => {
  const { from, sent_at, subject, body, has_attachments, id } = email;
  const senderName = JSON.parse(from)[0].name
  const handleClick = (id) => {
    setFocusId(id);
    setFocusPanel('email');
  }
//TODO: change moment format so that it will format based on time ago
  return (
    <div className={`EmailListItem ${focusId === id ? 'highlight-email-list-item': 'email-list-item'}`} onClick={() => handleClick(email.id)}>
      <h1>{senderName}</h1>
      <p>{body}</p>
      <p>{subject}</p>
      <p>{moment(sent_at).format("h:mma")}</p> 
      {has_attachments && <p>paperclip</p>}
    </div>
  );
}

export default EmailListItem;
