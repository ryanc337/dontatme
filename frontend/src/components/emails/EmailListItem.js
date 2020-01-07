import React from 'react';

export default function EmailListItem(props) {
  return (
    <div className="EmailListItem" >
      <h3>{props.from}</h3>
      <h3>{props.subject}</h3>
      <p>{props.body.substring(0, 30)}</p>
      <p>{props.timeSent.slice(11).substring(0, 8)}</p>
      <div className="EmailListItem-IconHolder">
      <h2>{props.from.substring(0, 1)}</h2>
      {props.attachments && <i>paperclip</i>}
      </div>
    </div>
  )
}