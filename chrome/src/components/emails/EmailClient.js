import React, { useState, useEffect } from 'react';
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
  iconColors
}) => {
  const [focusPanel, setFocusPanel] = useState('list');
  const [fetchedEmails, setFetchedEmails] = useState({});

  const getNextEmailIndex = (emails, prevFocusId) => {
    const oldIndex = emails.findIndex((email) => email.id === prevFocusId);
    if (emails.length === 1) {
      return null;
    } else {
      return emails[oldIndex + 1] ? emails[oldIndex + 1].id : emails[0].id
    }
  }

  const deleteEmailWithId = async () => {
    try {
      setIsLoading(true);

      const prevFocusId = focusId;

      const deletedEmail = await deleteEmail(address, prevFocusId);

      if (deletedEmail) {
        const nextEmailId = getNextEmailIndex(allEmails, prevFocusId);

        setFetchedEmails((prevState) => {
          const { prevFocusId, ...rest } = prevState;
          return rest;
        });

        setAllEmails((prevState) => prevState.filter((email) => email.id !== prevFocusId));

        setFocusId(nextEmailId);
      }
    } catch (error) {
      setAlert({
        color: 'red',
        show: true,
        message: 'Unable to delete email. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getParsedEmail = async () => {
      const rawEmail = await getRawEmail(address, focusId);
      setFetchedEmails((prevState) => ({
        ...prevState,
        [focusId]: rawEmail,
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
      setIsLoading(true)
      try {
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

  const focusedEmail = () => {
    return allEmails.find((email) => email.id === focusId)
  }

  const getFrom = () => {
    const email = focusedEmail();
    const from = JSON.parse(email.from);
    return from[0];
  };

  return (
    <div className={`email-client email-client${focusPanel === 'list' ? '__list' : '__email'}`}>
      <EmailList
        setFocusPanel={setFocusPanel}
        setFocusId={setFocusId}
        allEmails={allEmails}
        focusPanel={focusPanel}
        focusId={focusId}
        iconColors={iconColors}
      />

      {fetchedEmails[focusId] && focusedEmail() ? (
        <EmailItem
          from={getFrom(allEmails, focusId)}
          email={fetchedEmails[focusId]}
          deleteEmailWithId={deleteEmailWithId}
          setFocusPanel={setFocusPanel}
          focusPanel={focusPanel}
          iconColors={iconColors}
        />
      ) : <EmailEmpty />}

      {isLoading && <EmailLoading />}
    </div>
  );
};

export default EmailClient;
