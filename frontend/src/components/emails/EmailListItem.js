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
    <div className={`email-list-item ${focusId === id ? 'email-list-item__highlight': 'email-list-item'}`} onClick={() => handleClick(email.id)}>
      <h1>{senderName}</h1>
      <span>{senderName[0]}</span>
      <p className="email-list-item__body">{body}</p>
      <p className="email-list-item__subject">{subject}</p>
      <p className="email-list-item__time">{moment(sent_at).format("h:mma")}</p> 
      {has_attachments && <img alt="paperclip"/>}
    </div>
  );
}

export default EmailListItem;
