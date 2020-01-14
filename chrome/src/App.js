import React from 'react';
import './vendor/normalize-8.0.1.css';
import './App.css';
import EmailClient from './components/emails/EmailClient';

function App({ address }) {
  return (
    <EmailClient address={address} />
  );
}

export default App;