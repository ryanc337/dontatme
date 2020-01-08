import React, { useState, useEffect } from 'react';
import { simpleParser } from 'mailparser';
import { getRawEmail } from '../../api/index';
import EmailList from './EmailList';
import EmailItem from './EmailItem';

const EmailClient = ({ allEmails, address }) => { 
  const [ focusPanel, setFocusPanel ] = useState("list");
  const [ focusId, setFocusId ] = useState(null);
  const [ fetchedEmails, setFetchedEmails ] = useState({});

  useEffect(() => {
    const parseEmail = async (addressId, id) => {
      try {
        const rawEmail = await getRawEmail(addressId, id);
        const parsedEmail = await simpleParser(rawEmail);
        setFetchedEmails({
          ...fetchedEmails,
          [id]: parsedEmail
        })
        return parsedEmail;
      } catch (error) {
        console.log(error)
      }
    };
    if (!fetchedEmails.hasOwnProperty(focusId)) {
      parseEmail(address, focusId);
    }
  }, [focusId]);
  
  return (
    <div className={`EmailClient show-${focusPanel === "list" ? "list" : 'email'}`}>
      <EmailList
        setFocusPanel={setFocusPanel}
        setFocusId={setFocusId}
        allEmails={allEmails}
        focusPanel={focusPanel}
        focusId={focusId}
      />
      {focusId && fetchedEmails[focusId] ? <EmailItem email={fetchedEmails[focusId]} setFocusPanel={setFocusPanel} focusPanel={focusPanel} /> : <div>Empty Email</div>}
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