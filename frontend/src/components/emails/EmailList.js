import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';
import Email from './Email';

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