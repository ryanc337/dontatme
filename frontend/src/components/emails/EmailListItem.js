import React from 'react';
import moment from 'moment';

const EmailListItem = ({ email, setFocusPanel, setFocusId, focusId }) => {
  const { from, sent_at, subject, body, has_attachments, id } = email;
  const handleClick = (id) => {
    setFocusId(id);
    setFocusPanel('email');
  }

  return (
    <div className={`EmailListItem ${focusId === id ? 'highlight-email-list-item': 'email-list-item'}`} onClick={() => handleClick(email.id)}>
      <h1>{from}</h1>
      <p>{body}</p>
      <p>{subject}</p>
      {/* TODO: change this date function. It's brittle. */}
      <p>{moment(sent_at).calendar().slice(13)}</p> 
      {has_attachments && <p>paperclip</p>}
    </div>
  );
}

export default EmailListItem;
