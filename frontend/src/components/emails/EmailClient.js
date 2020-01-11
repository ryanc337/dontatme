import React, { useState, useEffect } from 'react';
import { simpleParser } from 'mailparser';
import { getRawEmail, deleteEmail } from '../../api/index';
import EmailLoading from './EmailLoading';
import EmailEmpty from './EmailEmpty';
import EmailList from './EmailList';
import EmailItem from './EmailItem';

const EmailClient = ({ allEmails, address, setAlert, setAllEmails, setIsLoading, isLoading }) => { 
  const [ focusPanel, setFocusPanel ] = useState("list");
  const [ focusId, setFocusId ] = useState(null);
  const [ fetchedEmails, setFetchedEmails ] = useState({});

  const deleteEmailWithId = async () => {
    try {
      setIsLoading(true);

      const prevFocusId = focusId;

      const deletedEmail = await deleteEmail(address, prevFocusId);

      setFocusId(null);

      if (deletedEmail) {
        setFetchedEmails(prevState => {
          const { prevFocusId, ...rest } = prevState;
          return rest;
        });

        setAllEmails(prevState => prevState.filter(email => email.id !== prevFocusId));
      }
    } catch (error) {
      setAlert({
        color: 'red',
        show: true,
        message: 'Unable to delete email. Please try again.'
      })
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getParsedEmail = async () => {
      try {
        setIsLoading(true);
        const rawEmail = await getRawEmail(address, focusId);
        const parsedEmail = await simpleParser(rawEmail);
        setFetchedEmails(prevState => ({ 
          ...prevState,
          [focusId]: parsedEmail
        }));
      } catch (error) {
        setAlert({
          color: 'red',
          show: true,
          message: 'Unable to load email. Please refresh page.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (focusId) {
      getParsedEmail();
    }
  }, [address, focusId]);

  const getFrom = (allEmails, id) => {
    const email = allEmails.find((email) => email.id === id)
    const from = JSON.parse(email.from);
    return from[0].name
  }
  
  return (
    <div className={`email-client email-client${focusPanel === "list" ? "__list" : '__email'}`}>
      <EmailList
        setFocusPanel={setFocusPanel}
        setFocusId={setFocusId}
        allEmails={allEmails}
        focusPanel={focusPanel}
        focusId={focusId}
      />

      {fetchedEmails[focusId] ? (
        <EmailItem 
          from={getFrom(allEmails, focusId)}
          email={fetchedEmails[focusId]} 
          deleteEmailWithId={deleteEmailWithId}
          setFocusPanel={setFocusPanel} 
          focusPanel={focusPanel} 
        />
      ) : <EmailEmpty />}

      {isLoading && <EmailLoading />}
    </div>
  );
};

export default EmailClient;
