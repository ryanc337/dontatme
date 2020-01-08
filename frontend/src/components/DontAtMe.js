import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAddress, getEmails, getRawEmail } from '../api/index';
import EmailClient from './emails/EmailClient';
const simpleParser = require('mailparser').simpleParser;

const DontAtMe = (props) => { 
  const [ address, setAddress ] = useState("");
  const [ allEmails, setAllEmails ] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const parseEmail = async () => {
      let rawEmail = await getRawEmail();
      let parsedEmail = await simpleParser(rawEmail);
      console.log(parsedEmail);
      return parsedEmail;
    }
    parseEmail();
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const fetchedAddress = await getAddress();
        setAddress(fetchedAddress.address);
      } catch (error) {
        console.log('Get Address function failed');
      }
    }
    fetchAddress();
  }, []);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const fetchedEmails = await getEmails();
        setAllEmails(fetchedEmails);
      } catch (error) {
        console.log('Get Emails function failed');
      }
    }
    fetchEmails();
  }, []);
  
  return (
    <div>
      <div>Email: {id}</div>
      <EmailClient allEmails={allEmails} />
    </div>
  );
};

export default DontAtMe;
