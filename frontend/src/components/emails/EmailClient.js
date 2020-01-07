import React from 'react'; // TODO: remove useState
import EmailList from './EmailList';
import EmailItem from './EmailItem';

const EmailClient = ({ emailData }) => { 

  return (
    <div className="EmailClient">
      <EmailList emailData={emailData}/> 
      <EmailItem />
    </div>
  );
}

export default EmailClient;
