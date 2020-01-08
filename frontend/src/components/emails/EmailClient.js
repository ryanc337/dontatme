import React, { useState } from 'react';
import EmailList from './EmailList';
import EmailItem from './EmailItem';

const EmailClient = ({ parseEmail, allEmails, renderEmail }) => { 
  const [ focusPanel, setFocusPanel ] = useState("list");
 
  return (
    <div className="EmailClient">
      {<EmailList className={`show-${focusPanel === "list" ? "list" : 'email'}`} setFocusPanel={setFocusPanel} parseEmail={parseEmail} allEmails={allEmails}/>}
      {renderEmail ? <EmailItem setFocusPanel={setFocusPanel} renderEmail={renderEmail} /> : <div>Empty Email</div>}
    </div>
  );
}

export default EmailClient;