import React from 'react';
import EmailListItem from './EmailListItem';
import EmailListHeader from './EmailListHeader';

export default function EmailList(props) {
  return (
    <div className="EmailList">
      <EmailListHeader />
      {
        props.emails.map((item) => {
          return (
          <EmailListItem
          onClick={props.onClick}
          key={item.id}
          id={item.id}
          body={item.body}
          from={item.from}
          subject={item.subject}
          sent_at={item.sent_at}
          has_attachments={item.has_attachments}
          />)
        })
      }
    </div>
  )
}