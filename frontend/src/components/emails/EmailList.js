import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';
import Email from './Email';

const EmailList = ({ emailData }) => {
  
  return (
    <div className="EmailList">
      <EmailListHeader />
      {emailData.map((item) => {
        return <EmailListItem key={item.id} email={item}/>
      })
    }
    </div>
  );
}

export default EmailList;