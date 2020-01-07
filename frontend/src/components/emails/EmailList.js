import React from 'react';
import EmailListItem from './EmailListItem';

export default function EmailList(props) {
  return (
    <div className="EmailList">
      <EmailListItem body={props.body} from={props.from} subject={props.subject} timeSent={props.timeSent} attachments={props.attachments}/>
    </div>
  )
}