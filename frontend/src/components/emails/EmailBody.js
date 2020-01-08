import React from 'react';

const EmailBody = ({ renderEmail }) => {
  return(
    <div className = "Emailbody">
      <h4>{renderEmail.from}</h4>
      <h1>{renderEmail.subject}</h1>
      <p>{renderEmail.body}</p>
      <p>{renderEmail.sent_at}</p>
    </div>
  );
}

export default EmailBody;