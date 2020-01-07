import React from 'react';

const EmailBody = ({ email }) => {
  return(
    <div className = "Emailbody">
      <h4>{email.from}</h4>
      <h1>{email.subject}</h1>
      <p>{email.body}</p>
      <p>{email.sent_at}</p>
    </div>
  );
}

export default EmailBody;