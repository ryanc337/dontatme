import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAddress, getEmails } from '../api/index';
import Alert from './layout/Alert'
import EmailClient from './emails/EmailClient';
import Hero from './landing/Hero';

const DontAtMe = (props) => { 
  const [ address, setAddress ] = useState("");
  const [ allEmails, setAllEmails ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ alert, setAlert ] = useState({
    show: false,
    color: 'red',
    message: ''
  })
  const { id } = useParams();
 
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const fetchedAddress = await getAddress();
        setAddress(fetchedAddress.address);
      } catch (error) {
        setAlert({
          show: true,
          color: 'red',
          message: 'Could not retreive an email address from our host.'
        })
        console.log('Get Address function failed');
      }
    }
    const fetchEmails = async (id) => {
      try {
        setIsLoading(true);
        const fetchedEmails = await getEmails();
        setAllEmails(fetchedEmails);
      } catch (error) {
        setAlert({
          show: true,
          color: 'red',
          message: 'Could not retreive emails from sender.'
        })
        console.log('Get Emails function failed');
      } finally {
        setIsLoading(false);
      }
    }
    id ? fetchEmails(id) && setAddress(id) : fetchAddress().then(() => fetchEmails(address))
  }, []);

  const closeAlert = () => {
    setAlert({
      ...alert,
      show: false
    })
  }
  console.log(alert.show);
  return (
    <div>
      <Hero address={address}/>
      <EmailClient address={address} 
      allEmails={allEmails} 
      setAlert={setAlert} 
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      />
      {alert.show && <Alert alert={alert} closeAlert={closeAlert}/>}
    </div>
  );
};

export default DontAtMe;
