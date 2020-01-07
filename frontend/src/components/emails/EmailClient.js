import React from 'react';
import EmailList from './EmailList'
export default function EmailClient(props) {
  return (
    <div className="EmailClient">
      <EmailList body={props.body} from={props.from} subject={props.subject} timeSent={props.timeSent} attachments={props.attachments}/>
    </div>
  )
}