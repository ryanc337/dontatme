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
      <div class="email-list-item__initial-container">
        <div className="email-list-item__initial">{senderName[0]}</div>
      </div>
      <div>
        <div>
          <span>{senderName}</span>
          <span>{moment(sent_at).format("h:mma")}</span>
        </div>
        <div className="heading">{subject}</div>
      </div>
      <div>{has_attachments && <span className="email-list-item__attachment">P</span>}</div>
      <div>{body}</div>
    </div>
  );
}

export default EmailListItem;
