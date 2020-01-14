import React from 'react';
import moment from 'moment';
import { ReactComponent as Paperclip } from '../../images/paperclip.svg';

const EmailListItem = ({
  email, setFocusId, setFocusPanel, focusId, has_attachments
}) => {
  const {
    from, sent_at, subject, body, id, is_read,
  } = email;

  const senderName = JSON.parse(from)[0].name;

  const handleClick = (idToFocus) => {
    setFocusId(idToFocus);
    setFocusPanel('email');
  };

  const className = () => {
    let classNameString = 'email-list-item';
    classNameString += (focusId === id ? ' email-list-item__selected' : '');
    classNameString += (is_read ? ' email-list-item__read' : '');
    return classNameString;
  };

  const formatTime = () => {
    const emailDate = new Date(sent_at);
    const now = new Date();
    return moment(sent_at).format(emailDate.getDate() === now.getDate() ? 'h:mm A' : 'MMM D'); 
  };

  return (
    <div
      className={className()}
      onClick={() => handleClick(email.id)}
    >
      <div className="email-list-item__initial-container">
        <div className="initial-circle">{senderName[0]}</div>
      </div>
      <div>
        <div className="email-list-item__sender-data">
          <span>{senderName}</span>
          <span>{formatTime()}</span>
        </div>
        <div className="email-list-item__subject">
          <div className="heading">{subject}</div>
          <div className="email-list-item__unread-dot" />
        </div>
      </div>
      <div className="email-list-item__attachment">
        {has_attachments && <Paperclip />}
      </div>
      <div className="email-list-item__body-preview">{`${body}...`}</div>
    </div>
  );
};

export default EmailListItem;