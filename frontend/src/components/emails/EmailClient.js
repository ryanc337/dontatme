import React, { useState } from 'react';
import EmailList from './EmailList';
import EmailItem from './EmailItem';

const EmailClient = ({ emailData }) => { 
  const [focusEmailId, setFocusEmailId] = useState(null);
  const email = emailData.find(email => email.id === focusEmailId);
  
  return (
    <div className="EmailClient">
      <EmailList setFocusEmailId={setFocusEmailId} emailData={emailData}/> 
      {focusEmailId === null ? <div>Empty Email</div> : <EmailItem email={email}/>}
    </div>
  );
}

export default EmailClient;
