import React from 'react';

const EmailListHeader = ({ address }) => (
  <div className="email-list-header">
    <input className="email-list-header__address-id" value={address+'@dontatme.ca'} readOnly/>
  </div>
);

export default EmailListHeader;
