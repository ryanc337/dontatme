import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';

const EmailList = ({
  allEmails, setFocusPanel, setFocusId, focusId, iconColors
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
          iconColors={iconColors}
        />
      ))}
    </div>
  </div>
);

export default EmailList;
