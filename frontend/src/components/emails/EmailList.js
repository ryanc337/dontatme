import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';
import Email from './Email';

const EmailList = ({ parseEmail, allEmails, setFocusPanel }) => {
  
  return (
    <div className="EmailList">
      <EmailListHeader />
      {allEmails.map((email) => {
        return <EmailListItem parseEmail={parseEmail} setFocusPanel={setFocusPanel}  key={email.id} email={email}/>
      })
    }
    </div>
  );
}

export default EmailList;