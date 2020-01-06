import React, { useState } from 'react';
import { getAddress, getEmails } from './api'


function App() {
  const [ address, setAddress ] = useState()
  const fetchAddress = async () => {
    try {
      return await getAddress()
    } catch (error) {
      console.log('Get Address function failed')
    }
  }

  const fetchEmails = async () => {
    try {
      return await getEmails()
    } catch (error) {
      console.log('Get Emails Function Failed')
    }
  }

  console.log(fetchAddress(), fetchEmails())

  return (
    <div className="App">

    </div>
  );
}

export default App;
