import React, { useState } from 'react';
import { getAddress, getEmails } from './api'


function App() {
  const [address, setAddress ] = useState()
  const fetchAddress = async () => {
    try {
      console.log(await getAddress())
    } catch (error) {
      console.log('Get Address function failed')
    }
  }

  const fetchEmails = async () => {
    try {
      console.log(await getEmails())
    } catch (error) {
      console.log('Get Address function failed')
    }
  }

  fetchEmails()
  fetchAddress()

  return (
    <div className="App">

    </div>
  );
}

export default App;
