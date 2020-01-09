import React, { useState, useEffect } from 'react';
import { simpleParser } from 'mailparser';
import { getRawEmail, deleteEmail } from '../../api/index';
import EmailLoading from './EmailLoading';
import EmailEmpty from './EmailEmpty';
import EmailList from './EmailList';
import EmailItem from './EmailItem';

const EmailClient = ({ allEmails, address, setAlert, setIsLoading, isLoading }) => { 
  const [ focusPanel, setFocusPanel ] = useState("list");
  const [ focusId, setFocusId ] = useState(null);
  const [ fetchedEmails, setFetchedEmails ] = useState({});

  const deleteEmailWithId = async () => {
    try {
      setIsLoading(true);
      const deletedEmail = await deleteEmail(address, focusId);
      console.log(deletedEmail)
      return deletedEmail;
    } catch (error) {
      setAlert({
        ...alert,
        show: true
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const parseEmail = async (addressId, id) => {
      try {
        setIsLoading(true);
        if (addressId, id) {
          const rawEmail = await getRawEmail(addressId, id);
          const parsedEmail = await simpleParser(rawEmail);
          console.log('after emailparse', Date.now())
          setFetchedEmails({
            ...fetchedEmails,
            [id]: parsedEmail
          })
          return parsedEmail;
        }
      } catch (error) {
        console.log(error)
        setAlert({
          show: true,
          color: 'red',
          message: 'Could not display the email sent.'
        })
      } finally {
        setIsLoading(false);
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
      deleteEmailWithId={deleteEmailWithId}
      setFocusPanel={setFocusPanel} 
      focusPanel={focusPanel} /> : <EmailEmpty />}

      {isLoading && <EmailLoading />}
    </div>
  );
}

export default EmailClient;
