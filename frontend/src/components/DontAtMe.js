import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ActionCable from 'actioncable';
import { getAddress, getEmails } from '../api/index';
import Alert from './layout/Alert'
import EmailClient from './emails/EmailClient';
import Hero from './landing/Hero';
import Header from './landing/Header'
import Footer from './landing/Footer';


const DontAtMe = (props) => { 
  const { id } = useParams();
  const [ address, setAddress ] = useState(id || '');
  const [ allEmails, setAllEmails ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ alert, setAlert ] = useState({
    show: false,
    color: 'red',
    message: ''
  });
  const cable = useRef();

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
    const fetchEmails = async (id) => {
      const fetchedEmails = await getEmails(id);
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
          message: errorMsg
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    if (id) {
      tryFetchData(() => fetchEmails(id), 'Unable to get emails. Please refresh page.');
    } else {
      tryFetchData(fetchAddress, 'Unable to load. Please refresh page.');
    }
  }, []);

  const closeAlert = () => setAlert({ ...alert, show: false });

  return (
    <div className="DontAtMe">
      {alert.show && <Alert alert={alert} closeAlert={closeAlert}/>}
      <Header />
      <Hero address={address}/>
      <EmailClient address={address} 
        allEmails={allEmails}
        setAllEmails={setAllEmails}
        setAlert={setAlert} 
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <Footer />
    </div>
  );
};

export default DontAtMe;
