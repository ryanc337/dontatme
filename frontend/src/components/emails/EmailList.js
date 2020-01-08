import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';

const EmailList = ({ allEmails, setFocusPanel }) => {
  
  return (
    <div className="EmailList">
      <EmailListHeader />
      {allEmails.map((email) => {
        return <EmailListItem setFocusPanel={setFocusPanel}  key={email.id} email={email}/>
      })
    }
    </div>
  );
}

export default EmailList;
