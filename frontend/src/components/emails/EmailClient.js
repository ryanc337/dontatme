import React, { useState, useEffect } from 'react';
import { simpleParser } from 'mailparser';
import { getRawEmail } from '../../api/index';
import EmailLoading from './EmailLoading';
import EmailEmpty from './EmailEmpty';
import EmailList from './EmailList';
import EmailItem from './EmailItem';

const EmailClient = ({ allEmails, address }) => { 
  const [ focusPanel, setFocusPanel ] = useState("list");
  const [ focusId, setFocusId ] = useState(null);
  const [ fetchedEmails, setFetchedEmails ] = useState({});
  const [ status, setStatus ] = useState("empty");

  useEffect(() => {
    const parseEmail = async (addressId, id) => {
      try {
        const rawEmail = await getRawEmail(addressId, id);
        const parsedEmail = await simpleParser(rawEmail);
        console.log('after emailparse', Date.now())
        setFetchedEmails({
          ...fetchedEmails,
          [id]: parsedEmail
        })
        setStatus('show')
        return parsedEmail;
      } catch (error) {
        console.log(error)
        setStatus('error')
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
      
      {focusId && fetchedEmails[focusId] ? <EmailItem 
      email={fetchedEmails[focusId]} 
      setFocusPanel={setFocusPanel} 
      focusPanel={focusPanel} /> : <EmailEmpty />}
    </div>
  );
}

export default EmailClient;
