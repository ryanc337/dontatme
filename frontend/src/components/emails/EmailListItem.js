import React from 'react';

export default function EmailListItem(props) {
  console.log(props)
  return (
    <div className="EmailListItem">
      <h3>{props.from}</h3>
    </div>
  )
}