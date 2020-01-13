import React from 'react';
import moment from 'moment';

const EmailListItem = ({ email, setFocusPanel, setFocusId, focusId }) => {
  const { from, sent_at, subject, body, has_attachments, id, is_read } = email;
  const senderName = JSON.parse(from)[0].name
  const handleClick = (id) => {
    setFocusId(id);
    setFocusPanel('email');
  }

  const className = () => {
    let classNameString = 'email-list-item';
    focusId === id && (classNameString += ' email-list-item__selected');
    is_read && (classNameString += ' email-list-item__read');
    return classNameString;
  } 

  const formatTime = () => {
    const duration = moment.duration(moment().diff(sent_at))
    const hours = duration.asHours();
    return hours >= 24 ? moment(sent_at).format('MMM H') : moment(sent_at).format('h:mma');
  }

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
        <div className={!is_read ? "email-list-item__unread-dot" : ""}></div>
      </div>
      </div>
      <div className="email-list-item__attachment">{has_attachments && <span>P</span>}</div>
      <div className="email-list-item__body-preview">{`${body}...`}</div>
    </div>
  );
}

export default EmailListItem;
