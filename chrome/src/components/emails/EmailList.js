import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';

const EmailList = ({
  allEmails, setFocusId, setFocusPanel, focusId
}) => (
  <div className="email-list">
    <EmailListHeader />
    <div className="email-list-item-container">
      {allEmails.map((email) => (
        <EmailListItem
          setFocusId={setFocusId}
          setFocusPanel={setFocusPanel}
          focusId={focusId}
          key={email.id}
          email={email}
        />
      ))}
    </div>
  </div>
);

export default EmailList;
