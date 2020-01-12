import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';

const EmailList = ({ allEmails, setFocusPanel, setFocusId, focusId }) => {
  return (
    <div className="email-list">
      <EmailListHeader />
      <div className="email-list-item-container">
        {allEmails.map((email) => {
          return (
          <EmailListItem 
          setFocusId={setFocusId} 
          setFocusPanel={setFocusPanel} 
          focusId={focusId} key={email.id} 
          email={email}  
          />
          )
        })}
      </div>
    </div>
  );
}

export default EmailList;
