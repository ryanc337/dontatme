import React, { useState } from 'react';
import EmailList from './EmailList';
import EmailItem from './EmailItem';
import Email from './Email';

const EmailClient = ({ emailData }) => { 
  const [ focusPanel, setFocusPanel ] = useState("list");
  const [ focusEmailId, setFocusEmailId ] = useState(null);
  const email = emailData.find(email => email.id === focusEmailId);

  return (
    <div className="EmailClient">
      {focusPanel === 'list' && <EmailList setFocusPanel={setFocusPanel} setFocusEmailId={setFocusEmailId} emailData={emailData}/>}
      {focusEmailId === null ? <div>Empty Email</div> : <EmailItem setFocusPanel={setFocusPanel} email={email}/>}
    </div>
  );
}

export default EmailClient;
