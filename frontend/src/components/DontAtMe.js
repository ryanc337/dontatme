import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAddress, getEmails } from '../api/index';
import EmailClient from './emails/EmailClient';

const DontAtMe = (props) => { 
  const [ address, setAddress ] = useState("");
  const [ allEmails, setAllEmails ] = useState([]);
  const { id } = useParams();

  // TODO: the below 2 useEffects should be just one useEffect. They should conditionally run based on id from useParams
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const fetchedAddress = await getAddress();
        setAddress(fetchedAddress.address);
      } catch (error) {
        console.log('Get Address function failed');
      }
    }
    const fetchEmails = async (id) => {
      try {
        const fetchedEmails = await getEmails();
        setAllEmails(fetchedEmails);
      } catch (error) {
        console.log('Get Emails function failed');
      }
    }
    id ? fetchEmails(id) : fetchAddress().then(() => fetchEmails(address))
  }, []);
  
  return (
    <div>
      <div>Email: {id}</div>
      <EmailClient address={address} allEmails={allEmails} />
    </div>
  );
};

export default DontAtMe;
