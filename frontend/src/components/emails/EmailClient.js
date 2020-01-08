import React, { useState } from 'react';
import EmailList from './EmailList';
import EmailItem from './EmailItem';

const EmailClient = ({ allEmails }) => { 
  const [ focusPanel, setFocusPanel ] = useState("list");
  
  return (
    <div className={`EmailClient show-${focusPanel === "list" ? "list" : 'email'}`}>
      <EmailList
        setFocusPanel={setFocusPanel}
        allEmails={allEmails}
        focusPanel={focusPanel}
        // TODO add focusID
      />
      {/* TODO: change - allEmails is alway truthy */}
      {allEmails ? <EmailItem setFocusPanel={setFocusPanel} focusPanel={focusPanel} /> : <div>Empty Email</div>}
    </div>
  );
}

export default EmailClient;

// TODO: how small screen focusPanel works
// @media (max-width: 500px) {
//   .show-list .EmailClient {
//     display: none;
//   }

//   .show-list .EmailList {
//     width: 100%;
//   }

//   .show-email .EmailList {
//     display: none;
//   }
// }