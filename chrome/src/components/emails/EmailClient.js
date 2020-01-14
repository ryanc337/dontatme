import React, { useState, useEffect, useRef } from 'react';
import { simpleParser } from 'mailparser';
import EmailList from './EmailList';
import ActionCable from 'actioncable';
import { getAddress, getEmails, getRawEmail, deleteEmail, updateEmailIsRead } from '../../api';
import Alert from '../layout/Alert';
import EmailItem from './EmailItem';
import EmailEmpty from './EmailEmpty';
import EmailLoading from './EmailLoading';

const EmailClient = (props) => {
  const [ address, setAddress ] = useState(props.address || '');
  const [ allEmails, setAllEmails ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ alert, setAlert ] = useState({ show: false, color: 'red', message: '' });
  const [ focusPanel, setFocusPanel ] = useState("list");
  const [ focusId, setFocusId ] = useState(null);
  const [ fetchedEmails, setFetchedEmails ] = useState({});
  const cable = useRef();

  /* global chrome */ 
  useEffect(() => {
    const fetchEmails = async (id) => {
      const fetchedEmails = await getEmails(id);
      setAllEmails(fetchedEmails.emails);
    };

    const fetchAddress = async () => {
      const fetchedAddress = await getAddress();
      chrome.storage.local.set({ address: fetchedAddress.address });
      setAddress(fetchedAddress.address);
    };
    
    const tryFetchData = async (fn, errorMsg) => {
      try {
        setIsLoading(true);
        await fn();
      } catch (error) {
        setAlert({
          color: 'red',
          show: true,
          message: errorMsg
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      tryFetchData(() => fetchEmails(address), 'Unable to get emails. Please refresh page.');
    } else {
      tryFetchData(fetchAddress, 'Unable to load. Please refresh page.');
    }
  }, []);

  useEffect(() => {
    cable.current = ActionCable.createConsumer(process.env.REACT_APP_URL + '/cable');
  }, []);

  useEffect(() => {
    if (address) {
      const connection = cable.current;
      
      const subscriptionParams = {
        id: address,
        channel: 'EmailsChannel'
      };
  
      const subscriptionListeners = {
        received(data) {
          const jsonEmail = JSON.parse(data.email);
          setAllEmails(prevState => [...prevState, jsonEmail]);
        }
      };
  
      connection.subscriptions.create(subscriptionParams, subscriptionListeners);
    }
  }, [address]);

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
      setIsLoading(true);
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

  const getFrom = (allEmails, id) => {
    const email = allEmails.find((email) => email.id === id);
    const from = JSON.parse(email.from);
    return from[0].name;
  };

  const deleteEmailWithId = async () => {
    try {
      setIsLoading(true);

      const prevFocusId = focusId;

      const deletedEmail = await deleteEmail(address, prevFocusId);

      setFocusId(null);

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
      setIsLoading(false);
    }
  };

  return (
    <div>
      {alert.show && <Alert 
        message={alert.message}
        color={alert.color}
        closeAlert={() => setAlert(prevState => ({ ...prevState, show: false }))}
      />}

      {isLoading && <EmailLoading />}

      <div>{address}</div>
    <div className='email-client-container'>
      <EmailList 
        allEmails={allEmails}
        focusId={focusId}
        setFocusId={setFocusId}
        setFocusPanet={setFocusPanel}
        focusPanel={focusPanel}
        />

      {fetchedEmails[focusId] ? (
      <EmailItem
        from={getFrom(allEmails, focusId)}
        email={fetchedEmails[focusId]}
        deleteEmailWithId={deleteEmailWithId}
        setFocusPanel={setFocusPanel}
      />
      ) : <EmailEmpty />}
    </div>
    </div>
  );
};

export default EmailClient