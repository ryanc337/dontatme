import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ActionCable from 'actioncable';
import { getAddress, getEmails } from '../api/index';
import Alert from './layout/Alert';
import EmailClient from './emails/EmailClient';
import Hero from './landing/Hero';
import Header from './landing/Header';
import getColor from '../lib/getColor';
import { WELCOME_ADDRESS } from '../lib/constants';

const DontAtMe = () => {
  const { id } = useParams();
  const [address, setAddress] = useState(id || '');
  const [allEmails, setAllEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [focusId, setFocusId] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    color: 'red',
    message: '',
  });
  const cable = useRef();
  const [iconColors, setIconColors] = useState({});

  useEffect(() => {    
    const updateColors = allEmails.reduce((newColors, email) => {
      const emailAddress = JSON.parse(email.from)[0].address;
      
      if (emailAddress === WELCOME_ADDRESS || newColors[emailAddress]) {
        return newColors;
      } else {
        const color = getColor(Object.keys(newColors).length);
        return {...newColors, [emailAddress]: color};
      }
    }, {...iconColors});

    setIconColors(updateColors);
  }, [allEmails]);

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

      const subscriptionListeners = {
        received(data) {
          const jsonEmail = JSON.parse(data.email);
          setAllEmails((prevState) => [jsonEmail, ...prevState]);
        },
      };

      connection.subscriptions.create(subscriptionParams, subscriptionListeners);
    }
  }, [address]);

  useEffect(() => {
    const fetchEmails = async (idParams) => {
      const fetchedEmails = await getEmails(idParams);
      setAllEmails(fetchedEmails.emails);
      if (fetchedEmails.emails.length > 0) {
        setFocusId(fetchedEmails.emails[0].id);
      }
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
        iconColors={iconColors}
        focusId={focusId}
        setFocusId={setFocusId}
      />
      <div className='DontAtMe__wave'></div>
    </div>
  );
};

export default DontAtMe;
