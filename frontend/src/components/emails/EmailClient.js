import React, { useState } from 'react';
import EmailList from './EmailList';
import EmailItem from './EmailItem';

const EmailClient = ({ allEmails }) => { 
  const [ focusPanel, setFocusPanel ] = useState("list");
  
  return (
    <div className="EmailClient">
      {<EmailList className={`show-${focusPanel === "list" ? "list" : 'email'}`} setFocusPanel={setFocusPanel} allEmails={allEmails}/>}
      {allEmails ? <EmailItem setFocusPanel={setFocusPanel} /> : <div>Empty Email</div>}
    </div>
  );
}

export default EmailClient;
