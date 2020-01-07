import React from 'react';
import { useParams } from 'react-router-dom';
import EmailClient from './emails/EmailClient';

const DontAtMe = (props) => {  
  const { id } = useParams();
  
  return (
    <div>
      <div>Email: {id}</div>
      <EmailClient />
    </div>
  );
};

export default DontAtMe;
