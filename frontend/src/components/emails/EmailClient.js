import React, { useState } from 'react'; // TODO: remove useState
import EmailList from './EmailList'
import EmailItem from './EmailItem';
import { getAddress, getEmails } from '../../api/index'; // TODO: move up to DontAtMe


export default function EmailClient(props) {
  const [address, setAddress ] = useState({
    address: "teddyleung@google.com"
  }) 
  // TODO: Move this state up to DontAtMe
  // Convert state to STRING instead of object with key
  const [ emails, setEmails ] = useState([
  {
    id: 1, 
    address_id: 1, // TODO remove address_id
    body: "Hello from the mock server",
    from: "Pee Wee Longway",
    subject: "Lets have coffee on friday",
    sent_at: "2009-03-27 23:53:38 UTC",
    has_attachments: true,
    storage_url: 'www.google.com'
  }, 
  {
    id: 2, 
    address_id: 1,
    body: "Hello from the mock server",
    from: "Guccimane",
    subject: "Lets go for a walk",
    sent_at: "2009-03-27 23:53:38 UTC",
    has_attachments: false,
    storage_url: 'www.amazon.com'
  }
])
  
// TODO: move fetching functions to DontAtMe
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

  // TODO: "state" should be called focusEmailId
  // Also, make the state a STRING instead of object
  const [ state, setState ] = useState({
    email_id: 1
  })

  const handleClick = (e, data) => {
    setState({ 
      email_id: e.target.parentElement.id 
     }) 
  }

  return (
    <div className="EmailClient">
      <EmailList onClick={(e) => handleClick(e)} emails={emails} /> // TODO pass setFocusEmailId function instead of calling one
    </div>
  )
}
