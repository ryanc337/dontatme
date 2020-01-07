import React from 'react';

export default function EmailListItem(props) {
  return (
    <div id={props.id} className="EmailListItem" onClick={props.onClick}>
      <h3>{props.from}</h3>
      <h3>{props.subject}</h3>
      <p>{props.body}</p>
      <p>{props.timeSent}</p>
      <h2>{props.from.substring(0,1)}</h2>
      {props.attachments && <i>paperclip</i>}
    </div>
  )
}