import React from 'react';
import Email from './Email';
import EmailItemHeader from './EmailItemHeader';


export default function EmailItem(props) {
  console.log(props)
  return(
    <div className="EmailItem">
      <EmailItemHeader />
      <Email />
    </div>
  )
}