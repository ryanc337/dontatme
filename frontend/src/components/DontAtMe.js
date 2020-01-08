import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAddress, getEmails, getRawEmail } from '../api/index';
import EmailClient from './emails/EmailClient';
const simpleParser = require('mailparser').simpleParser;

const DontAtMe = (props) => { 
  const [ address, setAddress ] = useState("");
  const [ allEmails, setAllEmails ] = useState([]);
  const [ renderEmail, setRenderEmail ] = useState([]);
  const { id } = useParams();

  const parseEmail = async () => {
    let rawEmail = await getRawEmail();
    let parsedEmail = await simpleParser(rawEmail);
    const formattedParsedEmail = {
      body: parsedEmail.text,
      attachments: parsedEmail.attachments,
      address_from: parsedEmail.from.value[0].address,
      name_from: parsedEmail.from.value[0].name,
      date: parsedEmail.date,
    };
    setRenderEmail(formattedParsedEmail);
    console.log(formattedParsedEmail);
    return formattedParsedEmail;
  }

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
  }, [])

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
  }, [])
  
  return (
    <div>
      <div>Email: {id}</div>
      <EmailClient parseEmail={parseEmail} allEmails={allEmails} renderEmail={renderEmail}/>
    </div>
  );
};

export default DontAtMe;