import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ActionCable from 'actioncable';
import { getAddress, getEmails } from '../api/index';
import Alert from './layout/Alert';
import EmailClient from './emails/EmailClient';
import Hero from './landing/Hero';
import Header from './landing/Header';

const DontAtMe = (props) => { 
  const { id } = useParams();
  const [address, setAddress] = useState(id || '');
  const [allEmails, setAllEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    color: 'red',
    message: '',
  });
  const cable = useRef();

  useEffect(() => {
    cable.current = ActionCable.createConsumer(`${process.env.REACT_APP_URL}/cable`);
  }, []);

  useEffect(() => {
    if (address) {
      const connection = cable.current;

      const subscriptionParams = {
        id: address,
        channel: 'EmailsChannel',
      };
      //new emails has to be prepended here
      const subscriptionListeners = {
        received(data) {
          const jsonEmail = JSON.parse(data.email);
          setAllEmails((prevState) => [jsonEmail, ...prevState]);
        },
      };

      connection.subscriptions.create(subscriptionParams, subscriptionListeners);
    }
  }, [address]);
// new email is already ordered by rails
  useEffect(() => {
    const fetchEmails = async (idParams) => {
      const fetchedEmails = await getEmails(idParams);
      setAllEmails(fetchedEmails.emails);
    };

    const fetchAddress = async () => {
      const fetchedAddress = await getAddress();
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
          message: errorMsg,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      tryFetchData(() => fetchEmails(id), 'Unable to get emails. Please refresh page.');
    } else {
      tryFetchData(fetchAddress, 'Unable to load. Please refresh page.');
    }
  }, []);

  const closeAlert = () => setAlert({ ...alert, show: false });

  return (
    <div className="DontAtMe">
      {alert.show && <Alert 
      message={alert.message} 
      closeAlert={closeAlert}
      color={alert.color} 
      />}
      <Header />
      <Hero address={address} />
      <EmailClient
        address={address}
        allEmails={allEmails}
        setAllEmails={setAllEmails}
        setAlert={setAlert}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <div className='DontAtMe__wave'></div>
    </div>
  );
};

export default DontAtMe;
