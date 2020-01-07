import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';

export default function EmailList(props) {
  return (
    <div className="EmailList">
      <EmailListHeader />
      <EmailListItem body={props.body} from={props.from} subject={props.subject} timeSent={props.timeSent} attachments={props.attachments}/>
    </div>
  )
}