import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmailClient from './emails/EmailClient';
import { getAddress, getEmails } from '../api/index';

const DontAtMe = (props) => {
  // TODO: "state" should be called focusEmailId
  // Also, make the state a STRING instead of object
  // TODO pass setFocusEmailId function instead of calling one  
  const [ address, setAddress ] = useState("");
  const [ emails, setEmails ] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const fetchedAddress = await getAddress();
        setAddress(fetchedAddress.email);
      } catch (error) {
        console.log('Get Address function failed');
      }
    }
    fetchAddress()
  }, [])

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const fetchedEmails = await getEmails();
        setEmails(fetchedEmails);
      } catch (error) {
        console.log('Get Address function failed');
      }
    }
    fetchEmails()
  }, [])
  
  return (
    <div>
      <div>Email: {id}</div>
      <EmailClient emailData={emails}/>
    </div>
  );
};

export default DontAtMe;
