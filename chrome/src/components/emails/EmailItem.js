import React from 'react';
import sanitizeHTML from 'sanitize-html';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';

const EmailItem = ({
  setFocusPanel, email, deleteEmailWithId, from, iconColors
}) => {
  const { attachments, html } = email;
  const cleanedHtml = sanitizeHTML(html);

  return (
    <div className="email-item">
      <EmailItemHeader
        from={from}
        iconColors={iconColors}
        setFocusPanel={setFocusPanel}
        deleteEmailWithId={deleteEmailWithId}
      />

      <Email
        html={cleanedHtml}
        attachments={attachments}
      />
    </div>
  );
};

export default EmailItem;
