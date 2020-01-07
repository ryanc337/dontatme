import React from 'react';
import EmailClient from './emails/EmailClient';
import { useParams } from 'react-router-dom';

export default function DontAtMe(props) {
  const PostParams = () => {
    let { id } = useParams();
    return(<div>{id}</div>)
  }

  return(
    <div>
      <EmailClient />
      <PostParams />
    </div>
  )

}