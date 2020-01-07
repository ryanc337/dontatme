import React from 'react';

export default function EmailListItem(props) {
  console.log(props)
  return (
    <div className="EmailListItem">
      <h3>{props.from}</h3>
      <h2>{props.subject}</h2>
      <p>{props.body.substring(0, 30)}</p>
      <p>{props.timeSent.slice(11).substring(0, 8)}</p>
      {props.attachments && <p>paperclip</p>}
    </div>
  )
}