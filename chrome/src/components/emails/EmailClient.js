import React, { useState, useEffect, useRef } from 'react';
import ActionCable from 'actioncable';
import { getAddress, getEmails } from '../../api';
import Alert from '../layout/Alert';
import Loading from '../layout/Loading';

const EmailClient = (props) => {
  const [ address, setAddress ] = useState(props.address || '');
  const [ allEmails, setAllEmails ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ alert, setAlert ] = useState({ show: false, color: 'red', message: '' });
  // const [ focusPanel, setFocusPanel ] = useState("list");
  // const [ focusId, setFocusId ] = useState(null);
  // const [ fetchedEmails, setFetchedEmails ] = useState({});
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

  return (
    <div>
      {alert.show && <Alert 
        message={alert.message}
        color={alert.color}
        closeAlert={() => setAlert(prevState => ({ ...prevState, show: false }))}
      />}
      {isLoading && <Loading />}
      <div>{address}</div>
      { allEmails.map((email, i) => (<div key={i}>{JSON.stringify(email)}</div>)) }
    </div>
  );
};

export default EmailClient