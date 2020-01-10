import React from 'react';
import sanitizeHTML from 'sanitize-html';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';

const EmailItem = ({ setFocusPanel, email, deleteEmailWithId }) => {
  const { attachments, html, from, date } = email;
  const cleanedHtml = sanitizeHTML(html);

  return (
    <div className="email-item">
      <EmailItemHeader 
      setFocusPanel={setFocusPanel} 
      deleteEmailWithId={deleteEmailWithId}
      />
      <div className="email-container">
      <Email
      date={date}
      from={from}
      html={cleanedHtml}
      attachments={attachments}
      />
      </div>
    </div>
  );
}

export default EmailItem;
