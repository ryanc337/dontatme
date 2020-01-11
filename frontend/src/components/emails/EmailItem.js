import React from 'react';
import sanitizeHTML from 'sanitize-html';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';

const EmailItem = ({ setFocusPanel, email, deleteEmailWithId, allEmails, focusId }) => {
  const { attachments, html, from, date } = email;
  const cleanedHtml = sanitizeHTML(html);

  return (
    <div className="email-item">
      <EmailItemHeader 
        focusId={focusId}
        allEmails={allEmails}
        setFocusPanel={setFocusPanel} 
        deleteEmailWithId={deleteEmailWithId}
      />

      <Email
        date={date}
        from={from}
        html={cleanedHtml}
        attachments={attachments}
      />
    </div>
  );
}

export default EmailItem;
