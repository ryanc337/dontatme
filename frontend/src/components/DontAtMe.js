import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAddress, getEmails, getRawEmail } from '../api/index';
import EmailClient from './emails/EmailClient';
const MailParser = require('mailparser').MailParser;


const DontAtMe = (props) => { 
  const [ address, setAddress ] = useState("");
  const [ emails, setEmails ] = useState([]);
  const { id } = useParams();
  
  const parseEmail = async () => {
    let rawEmail = await getRawEmail()
    let parsedEmail = await new MailParser(rawEmail)
    console.log(parsedEmail)
    return parsedEmail
  }

  parseEmail()

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const fetchedAddress = await getAddress();
        setAddress(fetchedAddress.address);
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
        console.log('Get Emails function failed');
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
