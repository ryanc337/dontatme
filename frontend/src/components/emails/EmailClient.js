import React, { useState, useEffect } from 'react';
import { simpleParser } from 'mailparser';
import { getRawEmail, deleteEmail, updateEmailIsRead } from '../../api/index';
import EmailLoading from './EmailLoading';
import EmailEmpty from './EmailEmpty';
import EmailList from './EmailList';
import EmailItem from './EmailItem';

const EmailClient = ({
  allEmails, 
  address, 
  setAlert, 
  setAllEmails, 
  setIsLoading, 
  isLoading, 
  focusId, 
  setFocusId, 
}) => {
  const [focusPanel, setFocusPanel] = useState('list');
  const [fetchedEmails, setFetchedEmails] = useState({});

  const focusNextEmail = (emails, id) => {
    if (emails.length === 1) {
      setFocusId(null);
    } else {
      const findIndexOfEmailToFocus = (email) => email.id === id;
      const indexToFocus = emails.findIndex(findIndexOfEmailToFocus);
      if (emails[indexToFocus + 1]) {
        return emails[indexToFocus + 1].id
      } else {
        return emails[0].id
      }
    }
  }

  const deleteEmailWithId = async () => {
    try {
      setIsLoading(true);

      const prevFocusId = focusId;

      const deletedEmail = await deleteEmail(address, prevFocusId);

      setFocusId(() => focusNextEmail(allEmails, prevFocusId));

      if (deletedEmail) {
        setFetchedEmails((prevState) => {
          const { prevFocusId, ...rest } = prevState;
          return rest;
        });

        setAllEmails((prevState) => prevState.filter((email) => email.id !== prevFocusId));
      }
    } catch (error) {
      setAlert({
        color: 'red',
        show: true,
        message: 'Unable to delete email. Please try again.',
      });
    } finally {
      
    }
  };

  useEffect(() => {
    const getParsedEmail = async () => {
      const rawEmail = await getRawEmail(address, focusId);
      const parsedEmail = await simpleParser(rawEmail);
      setFetchedEmails((prevState) => ({
        ...prevState,
        [focusId]: parsedEmail,
      }));
    };

    const readEmail = (address, focusId) => {
      try {
        setAllEmails((prevState) => prevState.map((email) => (email.id === focusId ? { ...email, is_read: true } : email)));
        updateEmailIsRead(address, focusId);
      } catch (error) {
        // Fail silently
      }
    };

    const openEmail = async () => {
      try {
        setIsLoading(true)
        await getParsedEmail();
        readEmail(address, focusId);
      } catch (error) {
        setAlert({
          color: 'red',
          show: true,
          message: 'Unable to load email. Please refresh page.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (focusId) {
      openEmail();
    } 

  }, [address, focusId]);

  const getFrom = (allEmails, id) => {
    const email = allEmails.find((email) => email.id === id);
    const from = JSON.parse(email.from);
    return from[0].name;
  };

  return (
    <div className={`email-client email-client${focusPanel === 'list' ? '__list' : '__email'}`}>
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
