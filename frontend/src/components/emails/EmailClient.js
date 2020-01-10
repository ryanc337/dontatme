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
      const deletedEmail = await deleteEmail(address, focusId);
      deletedEmail && setFetchedEmails(prevState => {
        const { focusId, ...rest } = prevState;
        return rest;
      });
      
      const emailToBeDeletedFromList = allEmails.filter((email) => email.id === focusId );
      setAllEmails(prevState => {
        const [ emailToBeDeletedFromList, ...rest ] = prevState;
        return rest;
      }) 
      setFocusId(null)
      console.log('deleted email running')
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

  return (
    <div className={`EmailClient show-${focusPanel === "list" ? "list" : 'email'}`}>
      {allEmails && <EmailList
        setFocusPanel={setFocusPanel}
        setFocusId={setFocusId}
        allEmails={allEmails}
        focusPanel={focusPanel}
        focusId={focusId}
      />}
      
      {fetchedEmails[focusId] ? (
        <EmailItem 
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
