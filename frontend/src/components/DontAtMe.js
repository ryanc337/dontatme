import React, { useState, useEffect } from 'react';
import { getAddress, getEmails } from '../api/index';
import EmailClient from './emails/EmailClient';
import { useParams } from 'react-router-dom';



export default function DontAtMe(props) {
  const [address, setAddress ] = useState({
    address: "teddyleung@google.com"
  })
  const [ emails, setEmails ] = useState([
  {
    id: 1, 
    address_id: 1,
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

  const PostParams = () => {
    let { id } = useParams();
    return(<div>{id}</div>)
  }

  return(
    <div>
      {
        emails.map((item) => {
        return (<EmailClient 
          key={item.id}
          from={item.from}
          body={item.body}
          subject={item.subject}
          timeSent={item.sent_at}
          attachments={item.has_attachments}
          />)
        })
      }
      <PostParams />
    </div>
  )

}