import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';
import Email from './Email';

const EmailList = ({ emailData, setFocusEmailId }) => {
  
  return (
    <div className="EmailList">
      <EmailListHeader />
      {emailData.map((email) => {
        return <EmailListItem setFocusEmailId={setFocusEmailId} key={email.id} email={email}/>
      })
    }
    </div>
  );
}

export default EmailList;