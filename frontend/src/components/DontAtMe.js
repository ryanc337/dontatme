import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { simpleParser } from 'mailparser';
import { getAddress, getEmails, getRawEmail } from '../api/index';
import EmailClient from './emails/EmailClient';

const DontAtMe = (props) => { 
  const [ address, setAddress ] = useState("");
  const [ allEmails, setAllEmails ] = useState([]);
  const { id } = useParams();

  // TODO: add dependency on focusedEmail state
  // TODO: add try catch
  // TODO: this useEffect should be in EmailClient
  useEffect(() => {
    const parseEmail = async () => {
      const rawEmail = await getRawEmail();
      const parsedEmail = await simpleParser(rawEmail);
      console.log(parsedEmail);
      return parsedEmail;
    }
    parseEmail();
  }, []);


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
