import React from 'react';

const EmailBody = ({ renderEmail }) => {
  return(
    <div className = "Emailbody">
      <h4>{renderEmail.name_from}</h4>
      <h6>{renderEmail.address_from}</h6>
      <p>{renderEmail.body}</p>
    </div>
  );
}

export default EmailBody;