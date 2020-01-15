import React from 'react';
import './vendor/normalize-8.0.1.css';
import './App.scss';
import DontAtMe from './components/DontAtMe';

function App({ address }) {
  return (
    <DontAtMe addressId={address} />
  );
}

export default App;
