import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';

const EmailList = ({ allEmails, setFocusPanel, setFocusId, focusId }) => {
  
  return (
    <div className="EmailList">
      <EmailListHeader />
      {allEmails.map((email) => {
        return <EmailListItem setFocusId={setFocusId} setFocusPanel={setFocusPanel} focusId={focusId} key={email.id} email={email} />
      })}
    </div>
  );
}

export default EmailList;
